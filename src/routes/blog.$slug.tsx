import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { POSTS } from "@/data/posts";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = POSTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) return {};
    return {
      meta: [
        { title: `${post.title} — J. G. Brasio` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${post.slug}` },
        { property: "article:published_time", content: post.date },
        { property: "article:section", content: post.category },
      ],
      links: [{ rel: "canonical", href: `/blog/${post.slug}` }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          datePublished: post.date,
          author: { "@type": "Person", name: "J. G. Brasio" },
          articleSection: post.category,
        }),
      }],
    };
  },
  component: PostPage,
  notFoundComponent: () => (
    <SiteLayout>
      <section className="container-wide px-6 py-32 text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-serif text-5xl font-light">Artigo não encontrado</h1>
        <Link to="/blog" className="mt-8 inline-block font-sans text-sm tracking-[0.16em] uppercase text-primary link-underline">
          Ver todos os artigos
        </Link>
      </section>
    </SiteLayout>
  ),
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const formatted = new Date(post.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

  return (
    <SiteLayout>
      <article className="container-wide px-6 py-16 md:py-24">
        <div className="container-prose">
          <Link to="/blog" className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.16em] uppercase text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar aos artigos
          </Link>

          <header className="mt-10">
            <p className="eyebrow">{post.category}</p>
            <h1 className="mt-6 font-serif text-4xl md:text-6xl font-light leading-[1.05]">
              {post.title}
            </h1>
            <p className="mt-6 font-sans text-sm text-muted-foreground">
              {formatted} · {post.readingTime} de leitura
            </p>
          </header>

          <div className="mt-14 font-serif text-lg leading-[1.8] space-y-6 text-foreground/90">
            {post.content.split(/\n\s*\n/).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <hr className="mt-20 border-rule" />
          <footer className="mt-10 flex items-center justify-between">
            <Link to="/blog" className="font-sans text-sm tracking-[0.14em] uppercase link-underline">
              ← Mais artigos
            </Link>
            <Link to="/contato" className="font-sans text-sm tracking-[0.14em] uppercase text-primary link-underline">
              Escrever ao autor
            </Link>
          </footer>
        </div>
      </article>
    </SiteLayout>
  );
}
