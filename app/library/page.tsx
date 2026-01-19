import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookOpen } from '@fortawesome/pro-solid-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { client, urlFor } from '@/lib/sanity/client';
import {
  booksQuery,
  currentlyReadingQuery,
  favoritesBooksQuery,
} from '@/lib/sanity/queries';
import type { SanityBook } from '@/lib/sanity/types';
import BooksGrid from './BooksGrid';

export const revalidate = 3600;

async function getBooks(): Promise<SanityBook[]> {
  return client.fetch(booksQuery);
}

async function getCurrentlyReading(): Promise<SanityBook[]> {
  return client.fetch(currentlyReadingQuery);
}

async function getFavorites(): Promise<SanityBook[]> {
  return client.fetch(favoritesBooksQuery);
}

export default async function LibraryPage() {
  const [books, currentlyReading, favorites] = await Promise.all([
    getBooks(),
    getCurrentlyReading(),
    getFavorites(),
  ]);

  // Transform books for the client component
  const formattedBooks = books.map((book) => ({
    id: book._id,
    title: book.title,
    author: book.author,
    cover: book.cover ? urlFor(book.cover).width(300).height(450).url() : null,
    category: book.category || 'other',
    rating: book.rating,
    takeaway: book.takeaway,
    goodreadsUrl: book.goodreadsUrl,
    favorite: book.favorite,
  }));

  const formattedCurrentlyReading = currentlyReading.map((book) => ({
    id: book._id,
    title: book.title,
    author: book.author,
    cover: book.cover ? urlFor(book.cover).width(100).height(150).url() : null,
    goodreadsUrl: book.goodreadsUrl,
  }));

  const categories = [
    { id: 'all', label: 'All Books' },
    { id: 'favorites', label: 'All-Time Favorites' },
    { id: 'fiction', label: 'Fiction' },
    { id: 'self-improvement', label: 'Self-Improvement' },
    { id: 'tech-business', label: 'Tech & Business' },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="border-b border-border py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <p className="mb-4 text-sm font-medium text-primary">Library</p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Books I Read & Recommend
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Reading shapes how I think about code, products, and life. Here
              are the books that have influenced me most, from epic fantasy to
              startup wisdom.
            </p>
          </div>
        </section>

        {/* Currently Reading */}
        {formattedCurrentlyReading.length > 0 && (
          <section className="border-b border-border bg-secondary/30 py-12 md:py-16">
            <div className="mx-auto max-w-6xl px-6">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                  <FontAwesomeIcon
                    icon={faBookOpen}
                    className="text-foreground"
                  />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  Currently Reading
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {formattedCurrentlyReading.map((book) => (
                  <div
                    key={book.id}
                    className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-4"
                  >
                    {/* Mini cover */}
                    <div className="flex h-16 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-secondary">
                      {book.cover ? (
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faBook}
                          className="text-muted-foreground"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold leading-tight text-foreground">
                        {book.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {book.author}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <BooksGrid books={formattedBooks} categories={categories} />

        {/* Recommendation CTA */}
        <section className="border-t border-border bg-secondary/30 py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              Got a Book Recommendation?
            </h2>
            <p className="mb-6 text-muted-foreground">
              I&apos;m always looking for my next great read. Send me your
              favorites!
            </p>
            <a
              href="https://twitter.com/ezeikel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-medium text-background transition-colors hover:bg-foreground/90"
            >
              <FontAwesomeIcon icon={faXTwitter} />
              Send me a recommendation
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
