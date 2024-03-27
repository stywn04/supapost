"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2 className="font-bold text-xl text-red-600">Something went wrong!</h2>
      <div className="p-5 bg-transparent border border-red-700 rounded-md mb-5">
        <p className="text-red-500 ">Erorr : {error.message}</p>
      </div>
      <button
        className="py-1 px-4 bg-transparent border border-red-700 text-red-700 hover:bg-red-700/10 rounded"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
