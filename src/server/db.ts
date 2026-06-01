// Server-only: D1 queries, one-time seeding, mapping to the shared Article type.
import type { D1Database } from "./env";
import {
  type Article,
  DEFAULT_CATEGORIES,
  slugify,
  estimateReadingTime,
  excerptFromHtml,
  plainTextToHtml,
} from "@/lib/articles";

interface ArticleRow {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  content_html: string;
  reading_time: string;
  published: number;
  date: string;
}

function mapRow(row: ArticleRow): Article {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    contentHtml: row.content_html,
    readingTime: row.reading_time,
    published: row.published === 1,
    date: row.date,
  };
}

const SELECT_COLS =
  "id, slug, title, excerpt, category, content_html, reading_time, published, date";

let seedPromise: Promise<void> | null = null;

// Seed the DB once from the legacy static posts so the live site keeps its
// existing articles the moment the database is wired up.
export async function ensureSeed(db: D1Database): Promise<void> {
  if (!seedPromise) {
    seedPromise = doSeed(db).catch((err) => {
      seedPromise = null; // allow retry on next request if it failed
      throw err;
    });
  }
  return seedPromise;
}

async function doSeed(db: D1Database): Promise<void> {
  const now = new Date().toISOString();

  for (const name of DEFAULT_CATEGORIES) {
    await db
      .prepare("INSERT OR IGNORE INTO categories (name, slug, created_at) VALUES (?, ?, ?)")
      .bind(name, slugify(name), now)
      .run();
  }

  const count = await db
    .prepare("SELECT COUNT(*) AS n FROM articles")
    .first<{ n: number }>();
  if (count && count.n > 0) return;

  const { POSTS } = await import("@/data/posts");
  for (const p of POSTS) {
    const html = plainTextToHtml(p.content);
    await db
      .prepare(
        `INSERT OR IGNORE INTO articles
         (slug, title, excerpt, category, content_html, reading_time, published, date, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?, ?)`,
      )
      .bind(
        p.slug,
        p.title,
        p.excerpt || excerptFromHtml(html),
        p.category,
        html,
        p.readingTime || estimateReadingTime(html),
        p.date,
        p.date,
        now,
      )
      .run();
  }
}

// --- Public reads ---

export async function listPublishedArticles(db: D1Database): Promise<Article[]> {
  await ensureSeed(db);
  const { results } = await db
    .prepare(`SELECT ${SELECT_COLS} FROM articles WHERE published = 1 ORDER BY date DESC, id DESC`)
    .all<ArticleRow>();
  return results.map(mapRow);
}

export async function getPublishedArticleBySlug(
  db: D1Database,
  slug: string,
): Promise<Article | null> {
  await ensureSeed(db);
  const row = await db
    .prepare(`SELECT ${SELECT_COLS} FROM articles WHERE slug = ? AND published = 1`)
    .bind(slug)
    .first<ArticleRow>();
  return row ? mapRow(row) : null;
}

// --- Admin reads ---

export async function listAllArticles(db: D1Database): Promise<Article[]> {
  await ensureSeed(db);
  const { results } = await db
    .prepare(`SELECT ${SELECT_COLS} FROM articles ORDER BY date DESC, id DESC`)
    .all<ArticleRow>();
  return results.map(mapRow);
}

export async function getArticleById(db: D1Database, id: number): Promise<Article | null> {
  const row = await db
    .prepare(`SELECT ${SELECT_COLS} FROM articles WHERE id = ?`)
    .bind(id)
    .first<ArticleRow>();
  return row ? mapRow(row) : null;
}

async function uniqueSlug(db: D1Database, base: string, excludeId?: number): Promise<string> {
  let candidate = base;
  let n = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const row = await db
      .prepare("SELECT id FROM articles WHERE slug = ?")
      .bind(candidate)
      .first<{ id: number }>();
    if (!row || row.id === excludeId) return candidate;
    n += 1;
    candidate = `${base}-${n}`;
  }
}

export interface ArticleInput {
  id?: number;
  title: string;
  excerpt?: string;
  category: string;
  contentHtml: string;
  date: string;
  published: boolean;
}

export async function createArticle(db: D1Database, input: ArticleInput): Promise<Article> {
  await ensureSeed(db);
  const now = new Date().toISOString();
  const slug = await uniqueSlug(db, slugify(input.title));
  const excerpt = input.excerpt?.trim() || excerptFromHtml(input.contentHtml);
  const readingTime = estimateReadingTime(input.contentHtml);

  const res = await db
    .prepare(
      `INSERT INTO articles
       (slug, title, excerpt, category, content_html, reading_time, published, date, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      slug,
      input.title,
      excerpt,
      input.category,
      input.contentHtml,
      readingTime,
      input.published ? 1 : 0,
      input.date,
      now,
      now,
    )
    .run();

  const id = res.meta.last_row_id!;
  return (await getArticleById(db, id))!;
}

export async function updateArticle(db: D1Database, input: ArticleInput): Promise<Article> {
  const id = input.id!;
  const now = new Date().toISOString();
  const slug = await uniqueSlug(db, slugify(input.title), id);
  const excerpt = input.excerpt?.trim() || excerptFromHtml(input.contentHtml);
  const readingTime = estimateReadingTime(input.contentHtml);

  await db
    .prepare(
      `UPDATE articles
       SET slug = ?, title = ?, excerpt = ?, category = ?, content_html = ?,
           reading_time = ?, published = ?, date = ?, updated_at = ?
       WHERE id = ?`,
    )
    .bind(
      slug,
      input.title,
      excerpt,
      input.category,
      input.contentHtml,
      readingTime,
      input.published ? 1 : 0,
      input.date,
      now,
      id,
    )
    .run();

  return (await getArticleById(db, id))!;
}

export async function deleteArticle(db: D1Database, id: number): Promise<void> {
  await db.prepare("DELETE FROM articles WHERE id = ?").bind(id).run();
}

// --- Categories ---

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export async function listCategories(db: D1Database): Promise<Category[]> {
  await ensureSeed(db);
  const { results } = await db
    .prepare("SELECT id, name, slug FROM categories ORDER BY name ASC")
    .all<Category>();
  return results;
}

export async function createCategory(db: D1Database, name: string): Promise<Category> {
  const now = new Date().toISOString();
  const slug = slugify(name);
  await db
    .prepare("INSERT OR IGNORE INTO categories (name, slug, created_at) VALUES (?, ?, ?)")
    .bind(name, slug, now)
    .run();
  const row = await db
    .prepare("SELECT id, name, slug FROM categories WHERE slug = ?")
    .bind(slug)
    .first<Category>();
  return row!;
}

export async function deleteCategory(db: D1Database, id: number): Promise<void> {
  await db.prepare("DELETE FROM categories WHERE id = ?").bind(id).run();
}

// --- Image metadata (Cloudinary) ---

export interface ImageMeta {
  publicId: string;
  url: string;
  contentType: string;
  size: number;
  createdAt: string;
}

export async function recordImage(
  db: D1Database,
  publicId: string,
  url: string,
  contentType: string,
  size: number,
): Promise<void> {
  await db
    .prepare(
      "INSERT OR REPLACE INTO images (public_id, url, content_type, size, created_at) VALUES (?, ?, ?, ?, ?)",
    )
    .bind(publicId, url, contentType, size, new Date().toISOString())
    .run();
}

export async function listImages(db: D1Database): Promise<ImageMeta[]> {
  const { results } = await db
    .prepare(
      "SELECT public_id AS publicId, url, content_type AS contentType, size, created_at AS createdAt FROM images ORDER BY created_at DESC",
    )
    .all<ImageMeta>();
  return results;
}

export async function deleteImageMeta(db: D1Database, publicId: string): Promise<void> {
  await db.prepare("DELETE FROM images WHERE public_id = ?").bind(publicId).run();
}
