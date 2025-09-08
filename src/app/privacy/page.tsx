export const metadata = { title: "Privacy — ÆSC Trust" };

export default function PrivacyPage() {
  return (
    <main className="container section">
      <h1 className="text-3xl font-semibold">Privacy Policy</h1>
      <p className="mt-4 text-aesc-sub max-w-3xl">
        We collect only the information needed to operate this site and respond to you. Newsletter subscriptions and contact
        messages are stored with our email provider (Resend). We do not sell personal data or run third-party advertising.
      </p>
      <ul className="mt-4 text-aesc-sub list-disc list-inside space-y-2 max-w-3xl">
        <li>Email and (optional) name for newsletter; you can unsubscribe anytime.</li>
        <li>Contact form payload (your message and email) for replies.</li>
        <li>Basic server logs for reliability and abuse prevention.</li>
      </ul>
      <p className="mt-4 text-aesc-sub">Questions: <a className="underline" href="/contact">contact us</a>.</p>
      <p className="mt-8 text-xs text-aesc-sub/70">Effective: {new Date().getFullYear()}</p>
    </main>
  );
}
