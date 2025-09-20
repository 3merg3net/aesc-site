"use client";

import dynamic from "next/dynamic";

const LiveMapCore = dynamic(() => import("./LiveMapCore"), {
  ssr: false,
  loading: () => (
    <div className="relative w-screen max-w-none [margin-left:calc(50%-50vw)] [margin-right:calc(50%-50vw)] h-[60vh]">
      <div className="absolute inset-0 grid place-items-center text-slate-400 text-sm">
        Loading map…
      </div>
    </div>
  ),
});

export default function LiveMapClient(props: { fullBleed?: boolean; heightClass?: string }) {
  return <LiveMapCore {...props} />;
}
