import { ReactNode } from "react";

export default function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl2 bg-aesc-panel/70 shadow-soft ring-1 ring-white/5">
      {children}
    </div>
  );
}
