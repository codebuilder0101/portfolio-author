import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { SiteLayout } from "@/components/SiteLayout";
import { BOOKS, AREA_LABELS, type Area } from "@/data/books";
import { BookCard } from "@/components/BookCard";

const areaSchema = z.object({
  area: z.enum(["todos", "direito", "filosofia", "ficcao"]).catch("todos"),
});

export const Route = createFileRoute("/livros")({
  validateSearch: areaSchema,
  head: () => ({
    meta: [
      { title: "Livros — J. G. Brasio" },
      { name: "description", content: "Catálogo completo de livros de J. G. Brasio em direito, filosofia e ficção. Compre na Amazon." },
      { property: "og:title", content: "Livros — J. G. Brasio" },
      { property: "og:description", content: "Catálogo completo de livros do autor." },
      { property: "og:url", content: "/livros" },
    ],
    links: [{ rel: "canonical", href: "/livros" }],
  }),
  component: LivrosPage,
});

const TABS: { id: "todos" | Area; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "direito", label: AREA_LABELS.direito },
  { id: "filosofia", label: AREA_LABELS.filosofia },
  { id: "ficcao", label: AREA_LABELS.ficcao },
];

function LivrosPage() {
  const { area } = Route.useSearch();
  const navigate = useNavigate({ from: "/livros" });

  const books = area === "todos" ? BOOKS : BOOKS.filter((b) => b.area === area);

  return (
    <SiteLayout>
      <section className="container-wide px-6 py-16 md:py-24">
        <header className="max-w-3xl">
          <p className="eyebrow">Catálogo</p>
          <h1 className="mt-6 font-serif text-5xl md:text-7xl font-light">Livros</h1>
          <p className="mt-6 font-serif italic text-xl text-foreground/70">
            Vinte e cinco títulos em três áreas. Todos disponíveis na Amazon.
          </p>
        </header>

        <div className="mt-14 rule-bottom">
          <nav aria-label="Filtrar por área" className="-mb-px flex flex-wrap gap-x-2 gap-y-1">
            {TABS.map((t) => {
              const active = area === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => navigate({ search: { area: t.id } })}
                  className={
                    "px-4 py-3 font-sans text-[13px] tracking-[0.14em] uppercase transition-colors border-b -mb-px " +
                    (active
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground")
                  }
                  aria-pressed={active}
                >
                  {t.label}
                  <span className="ml-2 font-sans text-[10px] tracking-normal normal-case text-muted-foreground/80">
                    {t.id === "todos" ? BOOKS.length : BOOKS.filter((b) => b.area === t.id).length}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((b) => <BookCard key={b.id} book={b} />)}
        </div>
      </section>
    </SiteLayout>
  );
}
