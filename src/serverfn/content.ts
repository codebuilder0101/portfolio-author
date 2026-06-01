// Public (unauthenticated) content reads, used by the blog routes and sitemap.
// Falls back to the legacy static posts if the D1 binding is not configured,
// so the live site keeps working before/while the database is provisioned.
import { createServerFn } from "@tanstack/react-start";
import { type Article, plainTextToHtml, estimateReadingTime, excerptFromHtml } from "@/lib/articles";
import { hasDb, getDb } from "@/server/env";
import { listPublishedArticles, getPublishedArticleBySlug } from "@/server/db";

async function staticArticles(): Promise<Article[]> {
  const { POSTS } = await import("@/data/posts");
  return POSTS.map((p, i) => {
    const contentHtml = plainTextToHtml(p.content);
    return {
      id: i + 1,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt || excerptFromHtml(contentHtml),
      category: p.category,
      contentHtml,
      readingTime: p.readingTime || estimateReadingTime(contentHtml),
      published: true,
      date: p.date,
    } satisfies Article;
  });
}

export const fetchArticles = createServerFn({ method: "GET" }).handler(async (): Promise<Article[]> => {
  if (!hasDb()) return staticArticles();
  try {
    return await listPublishedArticles(getDb());
  } catch (err) {
    console.error("fetchArticles falling back to static posts:", err);
    return staticArticles();
  }
});

export const fetchArticleBySlug = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => {
    if (typeof slug !== "string" || !slug) throw new Error("slug inválido");
    return slug;
  })
  .handler(async ({ data: slug }): Promise<Article | null> => {
    if (!hasDb()) {
      return (await staticArticles()).find((a) => a.slug === slug) ?? null;
    }
    try {
      return await getPublishedArticleBySlug(getDb(), slug);
    } catch (err) {
      console.error("fetchArticleBySlug falling back to static posts:", err);
      return (await staticArticles()).find((a) => a.slug === slug) ?? null;
    }
  });
