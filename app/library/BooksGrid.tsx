'use client';

import { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpRightFromSquare,
  faBook,
  faStar,
} from '@fortawesome/pro-solid-svg-icons';
import { cn } from '@/lib/utils';

type Book = {
  id: string;
  title: string;
  author: string;
  cover: string | null;
  category: string;
  rating?: number;
  takeaway?: string;
  goodreadsUrl?: string;
  favorite?: boolean;
};

type Category = {
  id: string;
  label: string;
};

type BooksGridProps = {
  books: Book[];
  categories: Category[];
};

function BookCard({ book }: { book: Book }) {
  return (
    <div className="group flex flex-col">
      {/* Book Cover */}
      <div className="relative mb-4 aspect-[2/3] overflow-hidden rounded-lg border border-border/60 bg-secondary/50">
        {book.cover ? (
          <img
            src={book.cover}
            alt={book.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-4">
            <div className="text-center">
              <FontAwesomeIcon
                icon={faBook}
                className="mb-2 text-3xl text-muted-foreground/50"
              />
              <p className="text-xs text-muted-foreground/50">Cover</p>
            </div>
          </div>
        )}
        {/* Hover overlay with link */}
        {book.goodreadsUrl && (
          <a
            href={book.goodreadsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center bg-foreground/80 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <span className="flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground">
              View on Goodreads
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="text-xs"
              />
            </span>
          </a>
        )}
      </div>

      {/* Book Info */}
      <div className="flex-1">
        <h3 className="mb-1 font-semibold leading-tight text-foreground">
          {book.title}
        </h3>
        <p className="mb-2 text-sm text-muted-foreground">{book.author}</p>

        {/* Rating */}
        {book.rating && (
          <div className="mb-2 flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <FontAwesomeIcon
                key={i}
                icon={faStar}
                className={cn(
                  'text-xs',
                  i < book.rating! ? 'text-foreground' : 'text-border',
                )}
              />
            ))}
          </div>
        )}

        {/* Takeaway */}
        {book.takeaway && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {book.takeaway}
          </p>
        )}
      </div>
    </div>
  );
}

export default function BooksGrid({ books, categories }: BooksGridProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredBooks = useMemo(() => {
    if (activeCategory === 'all') return books;
    if (activeCategory === 'favorites') return books.filter((b) => b.favorite);
    return books.filter((book) => book.category === activeCategory);
  }, [books, activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: books.length,
      favorites: books.filter((b) => b.favorite).length,
    };
    books.forEach((book) => {
      const cat = book.category;
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [books]);

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                activeCategory === category.id
                  ? 'bg-foreground text-background'
                  : 'border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground',
              )}
            >
              {category.label}
              {category.id !== 'all' && (
                <span className="ml-2 text-xs opacity-60">
                  {categoryCounts[category.id] || 0}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Books Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              No books in this category yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
