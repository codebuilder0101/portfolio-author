// Minimal ambient declaration so TS accepts the Cloudflare runtime module.
// The real bindings are typed in src/server/env.ts.
declare module "cloudflare:workers" {
  export const env: Record<string, unknown>;
}
