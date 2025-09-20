"use client";

import dynamic from "next/dynamic";

// Important: this file is a client component and does the dynamic import.
// No `ssr: false` in a server component—this is the client wrapper.
const LiveMapCore = dynamic(() => import("./LiveMapCore"), {
  ssr: false,
  loading: () => (
    <div className="relative w-screen max-w-none [margin-left:calc(50%-50vw)] [margin-right:calc(50%-50vw)] h-[60vh]">
      <div className="absolute inset-0 grid place-items-center text-slate-400 text-sm">Loading map…</div>
    </div>
  ),
});

export default function ClientLiveMap(props: { fullBleed?: boolean; heightClass?: string }) {
  return <LiveMapCore {...props} />;
}

