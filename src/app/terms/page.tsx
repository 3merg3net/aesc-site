export const metadata = { title: "Terms — ÆSC Trust" };

export default function TermsPage() {
  return (
    <main className="container section">
      <h1 className="text-3xl font-semibold">Terms of Use</h1>
      <p className="mt-4 text-aesc-sub max-w-3xl">
        This website and its contents are provided “as is” for informational purposes. No warranties are expressed or implied.
        By using this site you agree not to abuse services, probe for vulnerabilities, or interfere with availability.
      </p>
      <ul className="mt-4 text-aesc-sub list-disc list-inside space-y-2 max-w-3xl">
        <li>Copyright © {new Date().getFullYear()} ÆSC Trust. All rights reserved.</li>
        <li>Logos and brand assets require attribution; see <a className="underline" href="/press">Press & Media</a>.</li>
        <li>We may update these terms; continued use indicates acceptance.</li>
      </ul>
    </main>
  );
}
