export default function MapLegend() {
  return (
    <div className="pointer-events-auto rounded-xl border border-white/10 bg-black/60 p-2 text-xs text-zinc-300 backdrop-blur">
      <div><span className="inline-block h-2 w-2 rounded-full bg-cyan-300/80 align-middle mr-2" />Node</div>
      <div className="mt-1 text-zinc-400">Glow size = recent Signal activity (validator strength)</div>
    </div>
  );
}

