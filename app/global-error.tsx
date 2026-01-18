'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
          <h1 className="mb-4 text-2xl font-bold">Something went wrong</h1>
          <p className="mb-4 text-muted-foreground">
            An unexpected error occurred. We&apos;ve been notified and are
            working on it.
          </p>
          <button
            onClick={() => reset()}
            className="rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
