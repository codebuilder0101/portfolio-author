import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteLayout } from "@/components/SiteLayout";

function NotFoundComponent() {
  return (
    <SiteLayout>
      <section className="container-wide px-6 py-32 text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-serif text-5xl md:text-7xl font-light">Página não encontrada</h1>
        <p className="mx-auto mt-6 max-w-md text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-10">
          <Link to="/" className="font-sans text-sm tracking-[0.16em] uppercase text-primary link-underline">
            Voltar ao início
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <SiteLayout>
      <section className="container-wide px-6 py-32 text-center">
        <p className="eyebrow">Erro</p>
        <h1 className="mt-4 font-serif text-4xl md:text-5xl font-light">Esta página não carregou</h1>
        <p className="mx-auto mt-6 max-w-md text-muted-foreground">
          Algo deu errado. Tente novamente em instantes.
        </p>
        <div className="mt-10 flex justify-center gap-6">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="font-sans text-sm tracking-[0.16em] uppercase text-primary link-underline"
          >
            Tentar novamente
          </button>
          <a href="/" className="font-sans text-sm tracking-[0.16em] uppercase link-underline">
            Voltar ao início
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "J. G. Brasio — Direito, Filosofia e Ficção" },
      { name: "description", content: "Site oficial do autor J. G. Brasio. Obras de direito, filosofia (Somismo) e ficção, artigos e ensaios." },
      { name: "author", content: "J. G. Brasio" },
      { property: "og:site_name", content: "J. G. Brasio" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,400&family=Inter:wght@300;400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
          Pular para o conteúdo
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
