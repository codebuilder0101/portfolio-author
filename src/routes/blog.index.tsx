import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { POSTS } from "@/data/posts";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Artigos — J. G. Brasio" },
      { name: "description", content: "Artigos e ensaios de J. G. Brasio sobre direito, filosofia (Somismo) e literatura." },
      { property: "og:title", content: "Artigos — J. G. Brasio" },
      { property: "og:description", content: "Artigos e ensaios do autor." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

function BlogPage() {
  const [featured, ...rest] = POSTS;

  return (
    <SiteLayout>
      <section className="container-wide px-6 py-16 md:py-24">
        <header className="max-w-3xl">
          <p className="eyebrow">Blog</p>
          <h1 className="mt-6 font-serif text-5xl md:text-7xl font-light">Artigos</h1>
          <p className="mt-6 font-serif italic text-xl text-foreground/70">
            Notas, ensaios breves e fragmentos. Atualizado quando há algo a dizer.
          </p>
        </header>

        {/* Featured */}
        <article className="mt-16 rule-top pt-12">
          <p className="eyebrow">Em destaque · {featured.category}</p>
          <h2 className="mt-4 max-w-4xl font-serif text-4xl md:text-6xl font-light leading-[1.05]">
            <Link to="/blog/$slug" params={{ slug: featured.slug }} className="link-underline">
              {featured.title}
            </Link>
          </h2>
          <p className="mt-6 max-w-2xl font-serif text-xl text-foreground/80 leading-relaxed">
            {featured.excerpt}
          </p>
          <p className="mt-5 font-sans text-sm text-muted-foreground">
            {formatDate(featured.date)} · {featured.readingTime} de leitura
          </p>
        </article>

        {/* Grid */}
        <ul className="mt-20 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <li key={p.slug} className="rule-top pt-8 flex flex-col">
              <p className="eyebrow">{p.category}</p>
              <h3 className="mt-3 font-serif text-2xl leading-tight">
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="link-underline">{p.title}</Link>
              </h3>
              <p className="mt-3 flex-1 text-muted-foreground">{p.excerpt}</p>
              <p className="mt-5 font-sans text-xs text-muted-foreground">
                {formatDate(p.date)} · {p.readingTime}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </SiteLayout>
  );
}
