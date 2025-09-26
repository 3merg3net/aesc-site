"use client";

export default function ShareButtons({
  url,
  title = "Check out my Signal Profile",
  text = "Own your Signal Chain on the ÆSC Meshwork",
}: {
  url: string;
  title?: string;
  text?: string;
}) {
  function openWin(href: string) {
    const w = 560, h = 640;
    const y = window.top!.outerHeight / 2 + window.top!.screenY - ( h / 2);
    const x = window.top!.outerWidth  / 2 + window.top!.screenX - ( w / 2);
    window.open(href, "_blank", `width=${w},height=${h},left=${x},top=${y}`);
  }

  async function shareNative() {
    if ((navigator as any).share) {
      try { await (navigator as any).share({ title, text, url }); } catch {}
    } else {
      // fallback: copy to clipboard
      try { await navigator.clipboard.writeText(url); alert("Link copied ✨"); } catch {}
    }
  }

  const enc = (s: string) => encodeURIComponent(s);
  const TW = `https://twitter.com/intent/tweet?text=${enc(text)}&url=${enc(url)}`;
  const FB = `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`;
  const TG = `https://t.me/share/url?url=${enc(url)}&text=${enc(text)}`;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button onClick={shareNative} className="rounded-lg px-3 py-1 text-xs ring-1 ring-white/10 hover:bg-white/5">Share</button>
      <button onClick={() => openWin(TW)} className="rounded-lg px-3 py-1 text-xs ring-1 ring-white/10 hover:bg-white/5">X</button>
      <button onClick={() => openWin(TG)} className="rounded-lg px-3 py-1 text-xs ring-1 ring-white/10 hover:bg-white/5">Telegram</button>
      <button onClick={() => openWin(FB)} className="rounded-lg px-3 py-1 text-xs ring-1 ring-white/10 hover:bg-white/5">Facebook</button>
    </div>
  );
}
