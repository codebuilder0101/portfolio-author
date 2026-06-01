// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// In this scaffold @cloudflare/vite-plugin only runs during `build`, so the
// `cloudflare:workers` module (D1/Cloudinary bindings) does not exist during
// `vite dev`. Stub it in dev so the app boots; production uses the real module.
// NOTE: this means `vite dev` has NO database — the public site shows the static
// fallback and the admin panel's data operations need a deployed environment.
// (Login works in dev because the password is a static value, not DB-backed.)
function cloudflareWorkersDevStub() {
  const VIRTUAL = "\0cloudflare:workers-dev-stub";
  return {
    name: "cloudflare-workers-dev-stub",
    apply: "serve" as const,
    enforce: "pre" as const,
    resolveId(id: string) {
      if (id === "cloudflare:workers") return VIRTUAL;
      return undefined;
    },
    load(id: string) {
      if (id === VIRTUAL) return "export const env = {};";
      return undefined;
    },
  };
}

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  plugins: [cloudflareWorkersDevStub()],
});
