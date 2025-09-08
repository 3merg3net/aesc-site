"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    honey: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.honey) return; // spam trap
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed to send");
      setStatus("sent");
      setForm({ name: "", email: "", company: "", phone: "", message: "", honey: "" });
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Something went wrong");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid gap-4 max-w-xl">
      {/* spam honeypot */}
      <input name="honey" value={form.honey} onChange={onChange} className="hidden" tabIndex={-1} autoComplete="off" />

      <input
        name="name"
        value={form.name}
        onChange={onChange}
        placeholder="Your name"
        className="rounded-xl2 bg-aesc-panel/70 px-4 py-3 ring-1 ring-white/10"
        required
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={onChange}
        placeholder="Email"
        className="rounded-xl2 bg-aesc-panel/70 px-4 py-3 ring-1 ring-white/10"
        required
      />
      <input
        name="company"
        value={form.company}
        onChange={onChange}
        placeholder="Company (optional)"
        className="rounded-xl2 bg-aesc-panel/70 px-4 py-3 ring-1 ring-white/10"
      />
      <input
        name="phone"
        value={form.phone}
        onChange={onChange}
        placeholder="Phone (optional)"
        className="rounded-xl2 bg-aesc-panel/70 px-4 py-3 ring-1 ring-white/10"
      />
      <textarea
        name="message"
        value={form.message}
        onChange={onChange}
        placeholder="Message"
        className="rounded-xl2 bg-aesc-panel/70 px-4 py-3 ring-1 ring-white/10 h-36"
        required
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-xl2 bg-white/10 px-4 py-3 w-max disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send"}
      </button>

      {status === "sent" && <p className="text-green-400">Thanks — we’ll be in touch shortly.</p>}
      {status === "error" && <p className="text-red-400">Error: {error}</p>}
    </form>
  );
}
