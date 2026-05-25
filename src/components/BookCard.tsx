import { BookCover } from "./BookCover";
import { AREA_LABELS, type Book } from "@/data/books";
import { ExternalLink } from "lucide-react";

export function BookCard({ book }: { book: Book }) {
  return (
    <article className="group flex flex-col">
      <a
        href={book.amazonUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block transition-transform duration-500 ease-out group-hover:-translate-y-1"
        aria-label={`Ver ${book.title} na Amazon`}
      >
        <BookCover book={book} />
      </a>
      <div className="mt-5 flex items-baseline justify-between gap-3">
        <span className="eyebrow">{AREA_LABELS[book.area]}</span>
        <span className="font-sans text-xs text-muted-foreground">{book.year}</span>
      </div>
      <h3 className="mt-2 font-serif text-2xl leading-tight">
        <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer" className="link-underline">
          {book.title}
        </a>
      </h3>
      {book.subtitle && (
        <p className="mt-1 font-serif italic text-base text-muted-foreground">{book.subtitle}</p>
      )}
      <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
        {book.description}
      </p>
      <a
        href={book.amazonUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 self-start font-sans text-sm tracking-wide text-primary link-underline"
      >
        Comprar na Amazon
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    </article>
  );
}
