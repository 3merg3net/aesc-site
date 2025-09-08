export default function NotFound() {
  return (
    <main className="container section text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 text-aesc-sub">The link may be broken or the page may have moved.</p>
      <a href="/" className="inline-block mt-6 rounded-xl2 bg-white/10 px-4 py-2">Back home</a>
    </main>
  );
}
