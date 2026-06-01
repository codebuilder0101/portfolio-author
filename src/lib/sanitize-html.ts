// Allowlist HTML sanitizer for article bodies produced by the admin editor.
// Conservative by design: this is a trusted single-author CMS, but we still
// strip scripts, event handlers and dangerous URLs so stored content can never
// inject active code into the public site.

const ALLOWED_TAGS = new Set([
  "p", "br", "strong", "b", "em", "i", "u", "s",
  "h2", "h3", "h4", "blockquote", "ul", "ol", "li",
  "a", "img", "figure", "figcaption", "hr", "code", "pre",
]);

const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(["href", "title", "target", "rel"]),
  img: new Set(["src", "alt", "width", "height"]),
};

function isSafeUrl(url: string): boolean {
  const trimmed = url.trim();
  // Allow relative, root-relative, http(s) and mailto. Block javascript:, data:, etc.
  if (/^(https?:|mailto:)/i.test(trimmed)) return true;
  if (/^[/.#]/.test(trimmed)) return true;
  return false;
}

function filterAttrs(tag: string, rawAttrs: string): string {
  const allowed = ALLOWED_ATTRS[tag];
  if (!allowed) return "";

  const out: string[] = [];
  const attrRe = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'>]+))/g;
  let m: RegExpExecArray | null;
  while ((m = attrRe.exec(rawAttrs)) !== null) {
    const name = m[1].toLowerCase();
    const value = m[3] ?? m[4] ?? m[5] ?? "";
    if (name.startsWith("on")) continue; // event handlers
    if (!allowed.has(name)) continue;
    if ((name === "href" || name === "src") && !isSafeUrl(value)) continue;
    const safeValue = value.replace(/"/g, "&quot;");
    out.push(`${name}="${safeValue}"`);
  }

  // Force safe rel on links that open in a new tab.
  if (tag === "a") {
    const hasTargetBlank = /target\s*=\s*["']?_blank/i.test(rawAttrs);
    if (hasTargetBlank && !out.some((a) => a.startsWith("rel="))) {
      out.push('rel="noopener noreferrer"');
    }
  }

  return out.length ? " " + out.join(" ") : "";
}

export function sanitizeHtml(input: string): string {
  if (!input) return "";

  let html = input
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\s*(script|style|iframe|object|embed|link|meta)\b[\s\S]*?<\s*\/\s*\1\s*>/gi, "")
    .replace(/<\s*(script|style|iframe|object|embed|link|meta)\b[^>]*\/?>/gi, "");

  html = html.replace(/<(\/?)([a-zA-Z0-9]+)((?:[^>"']|"[^"]*"|'[^']*')*)>/g, (_full, slash: string, name: string, attrs: string) => {
    const tag = name.toLowerCase();
    if (!ALLOWED_TAGS.has(tag)) return "";
    if (slash === "/") return `</${tag}>`;
    const selfClosing = tag === "br" || tag === "hr" || tag === "img";
    return `<${tag}${filterAttrs(tag, attrs)}${selfClosing ? " /" : ""}>`;
  });

  return html.trim();
}
