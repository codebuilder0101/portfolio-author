import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { BOOKS, AREA_LABELS, type Area } from "@/data/books";
import { POSTS } from "@/data/posts";
import { BookCard } from "@/components/BookCard";
import { ArrowRight } from "lucide-react";
import portrait from "@/assets/portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "J. G. Brasio — Direito, Filosofia e Ficção" },
      { name: "description", content: "Site oficial de J. G. Brasio: livros, artigos e ensaios em direito, filosofia (Somismo) e ficção." },
      { property: "og:title", content: "J. G. Brasio — Direito, Filosofia e Ficção" },
      { property: "og:description", content: "Site oficial do autor J. G. Brasio." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function AreaSection({ area }: { area: Area }) {
  const items = BOOKS.filter((b) => b.area === area).slice(0, 3);
  return (
    <section className="rule-top py-16 md:py-24">
      <div className="container-wide px-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Área</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl font-light">{AREA_LABELS[area]}</h2>
          </div>
          <Link
            to="/livros"
            search={{ area }}
            className="hidden md:inline-flex items-center gap-2 font-sans text-sm tracking-[0.14em] uppercase text-primary link-underline"
          >
            Ver todos os livros
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((b) => <BookCard key={b.id} book={b} />)}
        </div>

        <div className="mt-10 md:hidden">
          <Link to="/livros" search={{ area }} className="font-sans text-sm tracking-[0.14em] uppercase text-primary link-underline">
            Ver todos os livros →
          </Link>
        </div>
      </div>
    </section>
  );
}

function Index() {
  const recent = POSTS.slice(0, 3);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="container-wide px-6 pt-16 pb-20 md:pt-28 md:pb-32">
        <p className="eyebrow fade-in-up">Autor · Brasil</p>
        <h1 className="mt-6 font-serif text-[clamp(3rem,9vw,8rem)] leading-[0.95] font-light fade-in-up">
          J. G. <span className="italic">Brasio</span>
        </h1>
        <p className="mt-8 max-w-2xl font-serif text-2xl md:text-3xl italic text-foreground/80 fade-in-up">
          Direito, filosofia e ficção — uma obra em três frentes, atravessada pela ideia de Somismo.
        </p>

        <div className="mt-16 grid gap-12 md:grid-cols-[260px_1fr] md:gap-16 md:items-start">
          <img
            src={portrait}
            alt="Retrato de J. G. Brasio"
            width={520}
            height={650}
            loading="eager"
            className="w-full max-w-[260px] grayscale"
          />
          <div className="max-w-prose">
            <p className="eyebrow">Sobre</p>
            <p className="mt-4 font-serif text-xl leading-relaxed">
              J. G. Brasio é jurista, ensaísta e ficcionista. Desde 2014 publica de forma
              independente, dividindo seu trabalho entre a teoria do direito, a filosofia
              contemporânea — onde desenvolve o conceito de <em>Somismo</em> — e a prosa de ficção.
            </p>
            <p className="mt-6 text-muted-foreground">
              Vinte e cinco títulos publicados, todos disponíveis em livrarias online. Seus textos
              têm em comum a recusa do ruído e a aposta numa leitura lenta.
            </p>
            <Link
              to="/sobre"
              className="mt-8 inline-flex items-center gap-2 font-sans text-sm tracking-[0.14em] uppercase text-primary link-underline"
            >
              Ler a biografia
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <AreaSection area="direito" />
      <AreaSection area="filosofia" />
      <AreaSection area="ficcao" />

      {/* Últimos artigos */}
      <section className="rule-top py-16 md:py-24">
        <div className="container-wide px-6">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Blog</p>
              <h2 className="mt-3 font-serif text-4xl md:text-5xl font-light">Últimos artigos</h2>
            </div>
            <Link to="/blog" className="hidden md:inline-flex items-center gap-2 font-sans text-sm tracking-[0.14em] uppercase text-primary link-underline">
              Ver todos os artigos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ul className="mt-12 grid gap-10 md:grid-cols-3">
            {recent.map((p) => (
              <li key={p.slug} className="rule-top pt-8">
                <p className="eyebrow">{p.category} · {new Date(p.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}</p>
                <h3 className="mt-3 font-serif text-2xl leading-tight">
                  <Link to="/blog/$slug" params={{ slug: p.slug }} className="link-underline">{p.title}</Link>
                </h3>
                <p className="mt-3 text-muted-foreground">{p.excerpt}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}
