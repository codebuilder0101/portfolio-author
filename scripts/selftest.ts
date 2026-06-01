import assert from "node:assert";
import { hashPassword, verifyPassword } from "@/server/password";
import { sanitizeHtml } from "@/lib/sanitize-html";
import { slugify, excerptFromHtml, estimateReadingTime, plainTextToHtml } from "@/lib/articles";

let n = 0;
const ok = (cond: boolean, msg: string) => {
  n++;
  assert.ok(cond, "FAILED: " + msg);
  console.log("  ✓", msg);
};

console.log("Password hashing:");
const h = await hashPassword("111111");
ok(h.startsWith("pbkdf2$100000$"), "hash has expected format");
ok(await verifyPassword("111111", h), "correct password verifies");
ok(!(await verifyPassword("000000", h)), "wrong password rejected");
const h2 = await hashPassword("111111");
ok(h !== h2, "same password produces different salted hashes");

console.log("HTML sanitizer:");
ok(!sanitizeHtml("<script>alert(1)</script><p>hi</p>").includes("script"), "strips <script>");
ok(!sanitizeHtml('<p onclick="x()">hi</p>').includes("onclick"), "strips event handlers");
ok(!sanitizeHtml('<a href="javascript:alert(1)">x</a>').includes("javascript:"), "strips javascript: urls");
ok(sanitizeHtml('<img src="/api/images/a.png" alt="x" />').includes('src="/api/images/a.png"'), "keeps image src");
ok(sanitizeHtml("<p><strong>b</strong></p>") === "<p><strong>b</strong></p>", "keeps allowed tags");
ok(sanitizeHtml('<a href="https://x.com" target="_blank">x</a>').includes('rel="noopener'), "adds rel on target=_blank");
ok(!sanitizeHtml('<iframe src="evil"></iframe><p>ok</p>').includes("iframe"), "strips <iframe>");

console.log("Slug / excerpt / reading time:");
ok(slugify("Olá, Mundo!") === "ola-mundo", "slugify strips accents & punctuation");
ok(slugify("O que é o Somismo") === "o-que-e-o-somismo", "slugify matches existing slugs");
ok(estimateReadingTime("<p>" + "word ".repeat(400) + "</p>") === "2 min", "reading time ≈ 2 min for 400 words");
ok(plainTextToHtml("a\n\nb").includes("<p>a</p>") && plainTextToHtml("a\n\nb").includes("<p>b</p>"), "plaintext → paragraphs");
const ex = excerptFromHtml("<p>" + "x".repeat(300) + "</p>", 50);
ok(ex.length <= 51 && ex.endsWith("…"), "excerpt truncates with ellipsis");

console.log(`\n✅ ${n} checks passed`);
