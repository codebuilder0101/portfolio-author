// Shared, client-safe content helpers and types.
// MUST NOT import server-only modules (no "cloudflare:workers").

export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  contentHtml: string;
  readingTime: string;
  published: boolean;
  date: string; // ISO (publish/display date)
}

export const DEFAULT_CATEGORIES = ["Direito", "Filosofia", "Ficção", "Ensaios"] as const;

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "artigo";
}

export function htmlToText(html: string): string {
  return html
    .replace(/<\/(p|div|h[1-6]|li|blockquote|br)>/gi, " ")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

export function estimateReadingTime(html: string): string {
  const words = htmlToText(html).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}

export function excerptFromHtml(html: string, max = 200): string {
  const text = htmlToText(html);
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Convert legacy plain-text posts (blank-line separated paragraphs) into HTML.
export function plainTextToHtml(text: string): string {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${escapeHtml(p).replace(/\n/g, "<br>")}</p>`)
    .join("\n");
}
