"use client";
import { useState } from "react";

export type MapFilters = { window: "10m" | "60m" | "all"; withLocOnly: boolean };

export default function MapControls({ value, onChange }: { value: MapFilters; onChange: (v: MapFilters) => void }) {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-2">
      <select
        className="rounded-md bg-white/5 px-2 py-1 text-sm ring-1 ring-white/10"
        value={value.window}
        onChange={(e) => onChange({ ...value, window: e.target.value as MapFilters["window"] })}
      >
        <option value="10m">Last 10m</option>
        <option value="60m">Last 60m</option>
        <option value="all">All time</option>
      </select>
      <label className="inline-flex items-center gap-2 text-sm text-slate-200">
        <input
          type="checkbox"
          checked={value.withLocOnly}
          onChange={(e) => onChange({ ...value, withLocOnly: e.target.checked })}
        />
        With location only
      </label>
    </div>
  );
}
