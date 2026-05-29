import { Link } from "@tanstack/react-router";
import { Instagram, Mail, BookOpen } from "lucide-react";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-32 rule-top">
      <div className="container-wide grid gap-10 px-6 py-14 md:grid-cols-3 md:py-20">
        <div>
          <p className="font-serif text-2xl">
            <span className="font-light">J. G.</span> <span className="italic">Brasio</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Direito, filosofia e ficção — uma obra em três frentes.
          </p>
        </div>

        <nav aria-label="Rodapé" className="md:justify-self-center">
          <p className="eyebrow mb-4">Navegação</p>
          <ul className="space-y-2 font-sans text-sm">
            <li><Link to="/sobre" className="link-underline">Sobre o Autor</Link></li>
            <li><Link to="/livros" className="link-underline">Livros</Link></li>
            <li><Link to="/blog" className="link-underline">Artigos</Link></li>
            <li><Link to="/contato" className="link-underline">Contato</Link></li>
          </ul>
        </nav>

        <div className="md:justify-self-end">
          <p className="eyebrow mb-4">Acompanhe</p>
          <ul className="flex gap-5">
            <li>
              <a
                href="https://www.amazon.com.br/s?k=J+G+Brasio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Livros na Amazon"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                <BookOpen className="h-5 w-5" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/jgbrasio" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-foreground/70 hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </li>
            <li>
              <a href="mailto:contato@jgbrasio.com.br" aria-label="E-mail" className="text-foreground/70 hover:text-foreground transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="rule-top">
        <div className="container-wide flex flex-col items-start justify-between gap-2 px-6 py-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {year} J. G. Brasio. Todos os direitos reservados.</p>
          <p className="font-serif italic">"Talvez a literatura ainda exista para nos lembrar daquilo que o mundo tenta fazer esquecer."</p>
        </div>
      </div>
    </footer>
  );
}
