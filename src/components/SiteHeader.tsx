import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre o Autor" },
  { to: "/livros", label: "Livros" },
  { to: "/blog", label: "Artigos" },
  { to: "/contato", label: "Contato" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur rule-bottom">
      <div className="container-wide flex items-center justify-between px-6 py-5 md:py-6">
        <Link
          to="/"
          className="font-serif text-xl tracking-tight"
          onClick={() => setOpen(false)}
        >
          <span className="font-light">J. G.</span>{" "}
          <span className="italic">Brasio</span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className="font-sans text-[13px] tracking-[0.14em] uppercase text-foreground/80 hover:text-foreground transition-colors"
                  activeProps={{ className: "font-sans text-[13px] tracking-[0.14em] uppercase text-foreground" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="md:hidden -mr-2 p-2 text-foreground"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav aria-label="Navegação mobile" className="md:hidden rule-top">
          <ul className="container-wide flex flex-col px-6 py-4">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-sans text-sm tracking-[0.14em] uppercase"
                  activeProps={{ className: "block py-3 font-sans text-sm tracking-[0.14em] uppercase text-primary" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
