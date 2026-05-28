import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import portrait from "@/assets/portrait.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre o Autor — J. G. Brasio" },
      { name: "description", content: "Biografia de J. G. Brasio: escritor, advogado, professor e conciliador extrajudicial. Obras em Direito, Filosofia (Somismo) e Ficção." },
      { property: "og:title", content: "Sobre o Autor — J. G. Brasio" },
      { property: "og:description", content: "Biografia e percurso intelectual do autor." },
      { property: "og:url", content: "/sobre" },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
  }),
  component: SobrePage,
});

function SobrePage() {
  return (
    <SiteLayout>
      <article className="container-wide px-6 py-16 md:py-24">
        <header className="container-prose text-center">
          <p className="eyebrow">Sobre o autor</p>
          <h1 className="mt-6 font-serif text-5xl md:text-7xl font-light">Biografia</h1>
          <p className="mt-6 font-serif italic text-xl text-foreground/70">
            "Talvez a literatura ainda exista para nos lembrar daquilo que o mundo tenta fazer esquecer."
          </p>
        </header>

        <figure className="mt-16 mx-auto max-w-[520px]">
          <img src={portrait} alt="Retrato de J. G. Brasio" width={520} height={650} className="w-full grayscale" />
          <figcaption className="mt-3 text-center text-xs text-muted-foreground italic">
            J. G. Brasio — Campinas, São Paulo.
          </figcaption>
        </figure>

        <div className="container-prose mt-20 font-serif text-lg leading-[1.75] space-y-7 text-foreground/90">
          <p>
            J. G. Brasio é o pseudônimo literário de João Gilberto de Camargo Brasio, escritor
            brasileiro, advogado, professor e conciliador extrajudicial. Vive em Campinas, São Paulo,
            cidade que atravessa parte importante de sua memória afetiva e de sua identidade literária.
          </p>

          <p>
            Sua produção literária se desenvolve entre três grandes territórios: o Direito, a
            Filosofia e a Ficção — cada um com sua atmosfera própria, mas atravessados por uma
            mesma busca: unir clareza, profundidade e identidade autoral.
          </p>

          <h2 className="font-serif text-3xl font-light pt-6">Direito</h2>
          <p>
            Na área jurídica, suas obras abordam temas ligados à desjudicialização, aos cartórios,
            à mediação, à prática extrajudicial e às transformações do sistema jurídico brasileiro
            contemporâneo. A proposta é aproximar o Direito da vida real — com clareza, reflexão e
            aplicação prática, sem perder profundidade técnica.
          </p>
          <p>
            Mais do que explicar normas, o autor busca compreender como o Direito impacta pessoas,
            relações e escolhas no cotidiano.
          </p>

          <h2 className="font-serif text-3xl font-light pt-6">Filosofia e o Somismo</h2>
          <p>
            Na filosofia, desenvolve o <em>Somismo</em> — uma reflexão contemporânea sobre
            existência, consciência, simplicidade e impermanência. Partindo da ideia de que o ser
            humano talvez procure respostas complexas para questões essencialmente simples, o
            Somismo propõe menos excesso, menos peso e mais presença.
          </p>
          <p>
            Não como fórmula pronta, mas como tentativa de compreender a experiência humana sem
            ilusões grandiosas, sem dogmas e sem negar as dificuldades da vida.
          </p>

          <h2 className="font-serif text-3xl font-light pt-6">Ficção</h2>
          <p>
            Na ficção, J. G. Brasio constrói narrativas marcadas por atmosfera, memória, território
            e tensão emocional. Entre silêncios, escolhas humanas, conflitos morais e o peso do
            tempo, seus romances transitam entre o intimista e o cinematográfico — explorando
            personagens imperfeitos, lugares carregados de memória e perguntas que continuam
            ecoando mesmo após o fim da história.
          </p>
          <p>
            Mais do que apenas narrativas, suas obras procuram criar experiência, permanência e sensação.
          </p>

          <h2 className="font-serif text-3xl font-light pt-6">Pensamentos</h2>
          <ul className="space-y-4 list-none pl-0">
            {[
              "Talvez viver seja apenas aprender a carregar menos peso.",
              "O tempo não passa igual dentro das pessoas.",
              "Nem toda resposta precisa ser definitiva para ser verdadeira.",
              "Há lugares que permanecem vivos mesmo depois que tudo desaparece.",
              "O ser humano talvez seja apenas o universo tentando compreender a si mesmo.",
            ].map((frase) => (
              <li key={frase} className="font-serif italic text-foreground/70 border-l-2 border-muted pl-5">
                "{frase}"
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 text-center">
          <Link to="/livros" className="font-sans text-sm tracking-[0.16em] uppercase text-primary link-underline">
            Ver todos os livros
          </Link>
        </div>
      </article>
    </SiteLayout>
  );
}
