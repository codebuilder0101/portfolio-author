import type { Book } from "@/data/books";

const AREA_BG: Record<Book["area"], string> = {
  direito: "var(--color-direito)",
  filosofia: "var(--color-filosofia)",
  ficcao: "var(--color-ficcao)",
};

export function BookCover({ book, className = "" }: { book: Book; className?: string }) {
  return (
    <div
      className={`relative aspect-[2/3] w-full overflow-hidden ${className}`}
      style={{ backgroundColor: AREA_BG[book.area] }}
      role="img"
      aria-label={`Capa do livro ${book.title}`}
    >
      {/* Inner frame to evoke a printed cover */}
      <div className="absolute inset-3 border border-white/25" />
      <div className="absolute inset-0 flex flex-col justify-between p-5 text-[oklch(0.97_0.008_80)]">
        <div className="flex items-start justify-between">
          <span
            className="font-sans text-[10px] tracking-[0.22em] uppercase opacity-80"
          >
            J. G. Brasio
          </span>
          <span className="font-sans text-[10px] tracking-[0.22em] uppercase opacity-60">
            {book.year}
          </span>
        </div>
        <div>
          <h3 className="font-serif text-[clamp(1.1rem,2vw,1.6rem)] leading-[1.05] font-light">
            {book.title}
          </h3>
          {book.subtitle && (
            <p className="mt-2 font-serif italic text-[0.78rem] leading-snug opacity-80">
              {book.subtitle}
            </p>
          )}
        </div>
        <div className="font-sans text-[10px] tracking-[0.22em] uppercase opacity-70">
          {book.area === "direito" ? "Direito" : book.area === "filosofia" ? "Filosofia" : "Ficção"}
        </div>
      </div>
    </div>
  );
}
