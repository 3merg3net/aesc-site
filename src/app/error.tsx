// src/app/error.tsx
"use client";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body className="bg-aesc-bg text-aesc-text">
        <main className="container section text-center">
          <h1 className="text-3xl font-semibold">Something went wrong</h1>
          <p className="mt-3 text-aesc-sub">{error?.message || "Unexpected error."}</p>
          <button
            className="mt-4 rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/5"
            onClick={() => reset()}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}

