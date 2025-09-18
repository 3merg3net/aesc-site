export default function MapLegend() {
  const Item = ({ c, label }: { c: string; label: string }) => (
    <div className="flex items-center gap-2">
      <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: c }} />
      <span className="text-xs text-slate-300">{label}</span>
    </div>
  );
  return (
    <div className="pointer-events-none absolute right-3 bottom-3 z-[500] rounded-lg bg-black/50 px-3 py-2 ring-1 ring-white/10">
      <div className="text-[11px] uppercase tracking-wide text-slate-400 mb-1">Legend</div>
      <div className="flex flex-col gap-1">
        <Item c="#22d3ee" label="< 10m" />
        <Item c="#f59e0b" label="< 60m" />
        <Item c="#64748b" label="older" />
      </div>
    </div>
  );
}
