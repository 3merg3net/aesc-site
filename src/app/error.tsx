// src/app/error.tsx
"use client";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-[#0B0F14] text-zinc-100">
      <main className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-semibold">Something went wrong</h1>
        <p className="mt-3 text-zinc-400">{error?.message || "Unexpected error."}</p>
        <button
          onClick={() => reset()}
          className="mt-6 rounded-lg border border-white/10 px-4 py-2 hover:bg-white/5"
        >
          Try again
        </button>
      </main>
    </div>
  );
}
