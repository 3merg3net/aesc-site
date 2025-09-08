"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [honey, setHoney] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (honey) return; // spam
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Subscription failed");
      setStatus("sent");
      setEmail("");
      setName("");
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Something went wrong");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 grid gap-3 max-w-md">
      {/* honeypot */}
      <input
        tabIndex={-1}
        autoComplete="off"
        value={honey}
        onChange={(e) => setHoney(e.target.value)}
        className="hidden"
        placeholder="Leave blank"
      />

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name (optional)"
        className="rounded-xl2 bg-aesc-panel/70 px-4 py-3 ring-1 ring-white/10"
      />
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="rounded-xl2 bg-aesc-panel/70 px-4 py-3 ring-1 ring-white/10"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-xl2 bg-white/10 px-4 py-3 w-max disabled:opacity-50"
      >
        {status === "sending" ? "Subscribing…" : "Subscribe"}
      </button>

      {status === "sent" && <p className="text-green-400 text-sm">You’re in. Thanks for subscribing!</p>}
      {status === "error" && <p className="text-red-400 text-sm">Error: {error}</p>}
      <p className="text-xs text-aesc-sub/80">
        We send periodic updates. Unsubscribe anytime.
      </p>
    </form>
  );
}
