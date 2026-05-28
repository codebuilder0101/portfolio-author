import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Instagram, Mail, BookOpen } from "lucide-react";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — J. G. Brasio" },
      { name: "description", content: "Entre em contato com o autor J. G. Brasio para imprensa, eventos ou correspondência geral." },
      { property: "og:title", content: "Contato — J. G. Brasio" },
      { property: "og:description", content: "Fale com o autor." },
      { property: "og:url", content: "/contato" },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sent");
    (e.currentTarget as HTMLFormElement).reset();
  }

  return (
    <SiteLayout>
      <section className="container-wide px-6 py-16 md:py-24">
        <div className="grid gap-16 md:grid-cols-[1fr_1.4fr] md:gap-24">
          <header>
            <p className="eyebrow">Contato</p>
            <h1 className="mt-6 font-serif text-5xl md:text-6xl font-light leading-[1.05]">
              Escrever ao autor
            </h1>
            <p className="mt-8 font-serif text-lg text-foreground/80 leading-relaxed">
              Para convites, entrevistas, parcerias editoriais ou simplesmente para enviar uma
              palavra sobre os livros, use o formulário ao lado. Respondo pessoalmente, ainda que
              com alguma demora.
            </p>

            <div className="mt-12 rule-top pt-8">
              <p className="eyebrow mb-4">Redes</p>
              <ul className="flex gap-5">
                <li>
                  <a href="https://www.amazon.com.br/s?k=J+G+Brasio" target="_blank" rel="noopener noreferrer" aria-label="Livros na Amazon" className="text-foreground/70 hover:text-foreground transition-colors">
                    <BookOpen className="h-5 w-5" />
                  </a>
                </li>
                <li><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-foreground/70 hover:text-foreground transition-colors"><Instagram className="h-5 w-5" /></a></li>
                <li><a href="mailto:contato@jgbrasio.com.br" aria-label="E-mail" className="text-foreground/70 hover:text-foreground transition-colors"><Mail className="h-5 w-5" /></a></li>
              </ul>
            </div>
          </header>

          <form onSubmit={onSubmit} className="rule-top pt-10 md:pt-0 md:border-0" noValidate>
            <div className="space-y-8">
              <Field label="Nome" name="name" type="text" required />
              <Field label="E-mail" name="email" type="email" required />
              <div>
                <label htmlFor="message" className="block eyebrow">Mensagem</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="mt-3 w-full resize-none border-b border-rule bg-transparent py-3 font-serif text-lg leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none"
                  placeholder="Escreva aqui…"
                />
              </div>

              <div className="flex items-center gap-6">
                <button
                  type="submit"
                  className="bg-primary px-8 py-4 font-sans text-[13px] tracking-[0.16em] uppercase text-primary-foreground hover:bg-primary/90 transition-colors rounded-sm"
                >
                  Enviar mensagem
                </button>
                {status === "sent" && (
                  <p className="font-serif italic text-sm text-muted-foreground">
                    Obrigado. Sua mensagem foi recebida.
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, name, type, required }: { label: string; name: string; type: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="block eyebrow">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-3 w-full border-b border-rule bg-transparent py-3 font-serif text-lg text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none"
      />
    </div>
  );
}
