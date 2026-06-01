// Server-only: access to Cloudflare bindings. Never import from client code.
import { env as cfEnv } from "cloudflare:workers";

// --- Minimal binding surfaces actually used by this app ---

export interface D1Result<T = Record<string, unknown>> {
  results: T[];
  success: boolean;
  meta: { last_row_id?: number; changes?: number };
}

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = Record<string, unknown>>(colName?: string): Promise<T | null>;
  all<T = Record<string, unknown>>(): Promise<D1Result<T>>;
  run(): Promise<D1Result>;
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  exec(query: string): Promise<unknown>;
}

export interface Bindings {
  DB?: D1Database;
  ADMIN_PASSWORD?: string;
  SESSION_SECRET?: string;
  CLOUDINARY_CLOUD_NAME?: string;
  CLOUDINARY_API_KEY?: string;
  CLOUDINARY_API_SECRET?: string;
  CLOUDINARY_FOLDER?: string;
}

export function getEnv(): Bindings {
  return cfEnv as unknown as Bindings;
}

export function getDb(): D1Database {
  const db = getEnv().DB;
  if (!db) {
    throw new Error(
      "Banco de dados não configurado. Crie o D1 (npx wrangler d1 create jgbrasio-content), " +
        "preencha o database_id em wrangler.jsonc e aplique as migrations.",
    );
  }
  return db;
}

export function hasDb(): boolean {
  return Boolean(getEnv().DB);
}

export function getCloudinaryConfig(): {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  folder: string;
} {
  const env = getEnv();
  const cloudName = env.CLOUDINARY_CLOUD_NAME;
  const apiKey = env.CLOUDINARY_API_KEY;
  const apiSecret = env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Cloudinary não configurado. Defina CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY " +
        "(vars) e CLOUDINARY_API_SECRET (secret).",
    );
  }
  return { cloudName, apiKey, apiSecret, folder: env.CLOUDINARY_FOLDER || "jgbrasio" };
}
