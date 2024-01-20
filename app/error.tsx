'use client';

import { useEffect } from 'react';

// TODO: implement Sentry error like _error.tsx

export default function Error({
  error,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <p>Oh no, something went wrong... maybe refresh?</p>
    </div>
  );
}
