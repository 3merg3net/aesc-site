export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50
                 rounded-xl2 bg-white/10 px-4 py-2"
    >
      Skip to content
    </a>
  );
}
