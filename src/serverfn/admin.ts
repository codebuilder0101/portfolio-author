// Authenticated admin operations (RPC bridge). The server-only internals it
// uses (env/db/auth) live under src/server and are stripped from the client.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb, getCloudinaryConfig } from "@/server/env";
import { uploadImage, destroyImage } from "@/server/cloudinary";
import { requireAuth, isAuthenticated, startSession, endSession, checkPassword } from "@/server/auth";
import {
  listAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  listCategories,
  createCategory,
  deleteCategory,
  recordImage,
  listImages,
  deleteImageMeta,
  type Category,
  type ImageMeta,
} from "@/server/db";
import type { Article } from "@/lib/articles";
import { sanitizeHtml } from "@/lib/sanitize-html";

export type { Article } from "@/lib/articles";
export type { Category, ImageMeta } from "@/server/db";

// ---------- Auth ----------

export const getSession = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ authenticated: boolean }> => {
    return { authenticated: await isAuthenticated() };
  },
);

export const login = createServerFn({ method: "POST" })
  .inputValidator((d: { password: string }) => z.object({ password: z.string().min(1) }).parse(d))
  .handler(async ({ data }): Promise<{ ok: boolean }> => {
    const ok = checkPassword(data.password);
    if (ok) await startSession();
    return { ok };
  });

export const logout = createServerFn({ method: "POST" }).handler(async (): Promise<{ ok: true }> => {
  await endSession();
  return { ok: true };
});

// ---------- Articles ----------

export const adminListArticles = createServerFn({ method: "GET" }).handler(
  async (): Promise<Article[]> => {
    await requireAuth();
    return listAllArticles(getDb());
  },
);

export const adminGetArticle = createServerFn({ method: "GET" })
  .inputValidator((id: number) => z.number().int().positive().parse(id))
  .handler(async ({ data: id }): Promise<Article | null> => {
    await requireAuth();
    return getArticleById(getDb(), id);
  });

const articleSchema = z.object({
  id: z.number().int().positive().optional(),
  title: z.string().trim().min(1, "O título é obrigatório."),
  category: z.string().trim().default(""),
  excerpt: z.string().trim().optional(),
  contentHtml: z.string().default(""),
  date: z.string().min(1),
  published: z.boolean().default(true),
});

export const adminSaveArticle = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => articleSchema.parse(d))
  .handler(async ({ data }): Promise<Article> => {
    await requireAuth();
    const db = getDb();
    const input = {
      id: data.id,
      title: data.title,
      category: data.category,
      excerpt: data.excerpt,
      contentHtml: sanitizeHtml(data.contentHtml),
      date: data.date,
      published: data.published,
    };
    return data.id ? updateArticle(db, input) : createArticle(db, input);
  });

export const adminDeleteArticle = createServerFn({ method: "POST" })
  .inputValidator((id: number) => z.number().int().positive().parse(id))
  .handler(async ({ data: id }): Promise<{ ok: true }> => {
    await requireAuth();
    await deleteArticle(getDb(), id);
    return { ok: true };
  });

// ---------- Categories ----------

export const adminListCategories = createServerFn({ method: "GET" }).handler(
  async (): Promise<Category[]> => {
    await requireAuth();
    return listCategories(getDb());
  },
);

export const adminCreateCategory = createServerFn({ method: "POST" })
  .inputValidator((name: string) => z.string().trim().min(1).parse(name))
  .handler(async ({ data: name }): Promise<Category> => {
    await requireAuth();
    return createCategory(getDb(), name);
  });

export const adminDeleteCategory = createServerFn({ method: "POST" })
  .inputValidator((id: number) => z.number().int().positive().parse(id))
  .handler(async ({ data: id }): Promise<{ ok: true }> => {
    await requireAuth();
    await deleteCategory(getDb(), id);
    return { ok: true };
  });

// ---------- Images ----------

const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
  "image/svg+xml",
]);
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

export interface UploadedImage {
  publicId: string;
  url: string;
}

export const adminUploadImage = createServerFn({ method: "POST" })
  .inputValidator((data: FormData) => {
    if (!(data instanceof FormData)) throw new Error("Envio inválido.");
    return data;
  })
  .handler(async ({ data }): Promise<UploadedImage> => {
    await requireAuth();
    const file = data.get("file");
    if (!(file instanceof File)) throw new Error("Nenhum arquivo enviado.");
    if (!ALLOWED_IMAGE_TYPES.has(file.type)) throw new Error("Tipo de imagem não suportado.");
    if (file.size > MAX_IMAGE_BYTES) throw new Error("Imagem muito grande (máx. 10 MB).");

    const cfg = getCloudinaryConfig();
    const bytes = await file.arrayBuffer();
    const result = await uploadImage(bytes, file.name || "upload", file.type, cfg);
    await recordImage(getDb(), result.publicId, result.url, file.type, result.bytes || file.size);

    return { publicId: result.publicId, url: result.url };
  });

export const adminListImages = createServerFn({ method: "GET" }).handler(
  async (): Promise<ImageMeta[]> => {
    await requireAuth();
    return listImages(getDb());
  },
);

export const adminDeleteImage = createServerFn({ method: "POST" })
  .inputValidator((publicId: string) => z.string().min(1).parse(publicId))
  .handler(async ({ data: publicId }): Promise<{ ok: true }> => {
    await requireAuth();
    await destroyImage(publicId, getCloudinaryConfig());
    await deleteImageMeta(getDb(), publicId);
    return { ok: true };
  });
