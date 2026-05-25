import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import portrait from "@/assets/portrait.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre o Autor — J. G. Brasio" },
      { name: "description", content: "Biografia de J. G. Brasio: formação em direito, filosofia contemporânea, o conceito de Somismo e sua obra de ficção." },
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
            "Escrever é a forma mais lenta de pensar — e por isso mesmo, a mais fiel."
          </p>
        </header>

        <figure className="mt-16 mx-auto max-w-[520px]">
          <img src={portrait} alt="Retrato de J. G. Brasio" width={520} height={650} className="w-full grayscale" />
          <figcaption className="mt-3 text-center text-xs text-muted-foreground italic">
            Fotografia, 2024.
          </figcaption>
        </figure>

        <div className="container-prose mt-20 font-serif text-lg leading-[1.75] space-y-7 text-foreground/90">
          <p>
            J. G. Brasio nasceu em Belo Horizonte, em 1972. Formou-se em Direito pela Universidade
            Federal de Minas Gerais, onde mais tarde defendeu mestrado e doutorado em Filosofia do
            Direito. Atuou como advogado e procurador antes de dedicar-se, a partir de 2014,
            exclusivamente à escrita e à pesquisa.
          </p>

          <h2 className="font-serif text-3xl font-light pt-6">Direito</h2>
          <p>
            Seu trabalho jurídico desenvolve-se na fronteira entre a teoria do direito e a filosofia
            política. Interessa-se sobretudo pelos limites da interpretação, pelo papel do silêncio
            normativo e pela relação entre razão pública e decisão judicial. Publicou oito livros na
            área, entre manuais e ensaios, marcados por um vocabulário sóbrio e pela recusa do jargão.
          </p>

          <h2 className="font-serif text-3xl font-light pt-6">Filosofia e o Somismo</h2>
          <p>
            Em paralelo à obra jurídica, vem construindo um projeto filosófico próprio, organizado
            em torno do conceito de <em>Somismo</em>. A palavra — neologismo seu — designa a hipótese
            de que o pensamento, quando fiel à experiência, é antes um trabalho de soma do que de
            divisão. O Somismo opõe-se, assim, ao reflexo analítico de separar o sujeito de seu
            mundo, a linguagem de seu uso, o indivíduo do comum.
          </p>
          <p>
            O programa foi exposto inicialmente em <em>Somismo: ensaios iniciais</em> (2016) e
            desdobrou-se em outros dez títulos, incluindo o tríptico <em>Somismo I, II</em> e <em>III</em>.
            A trilogia é frequentemente apontada como o centro de gravidade de sua obra filosófica.
          </p>

          <h2 className="font-serif text-3xl font-light pt-6">Ficção</h2>
          <p>
            A prosa de ficção surge, segundo o próprio autor, como contraponto e respiro à escrita
            ensaística. Seus romances e contos são breves, atentos à paisagem brasileira e
            estilisticamente próximos da tradição lusófona — Vergílio Ferreira, Clarice Lispector,
            Bernardo Soares. Publicou até hoje seis volumes de ficção, todos pela mesma editora
            independente.
          </p>

          <h2 className="font-serif text-3xl font-light pt-6">Hoje</h2>
          <p>
            Vive entre Belo Horizonte e o litoral norte de Santa Catarina. Mantém este site como
            arquivo público de sua obra e como espaço para textos avulsos, fora do circuito
            acadêmico e editorial.
          </p>
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
