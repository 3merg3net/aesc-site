import Banner from "@/components/Banner";
import DividerGlyph from "@/components/DividerGlyph";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact — ÆSC Trust",
  description: "Reach out regarding research, grants, governance, and press inquiries.",
  openGraph: { images: ["/aesctrust/contact-banner.png"] },
};

export default function ContactPage() {
  return (
    <main>
      <Banner src="/aesctrust/contact-banner.png" alt="Contact" />
      <section className="section container">
        <h1 className="text-4xl font-semibold">Contact</h1>
        <p className="mt-2 text-aesc-sub">For research, grants, governance, and press inquiries.</p>
        <DividerGlyph />
        <ContactForm />
      </section>
    </main>
  );
}





