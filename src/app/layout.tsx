// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
// If you have these, keep them; otherwise delete the import + element.
// import SEOOrg from "@/components/SEOOrg";
// import SkipLink from "@/components/SkipLink";
import { inter } from "./fonts"; // ok if you don't have fonts.ts; remove both uses

export const metadata: Metadata = {
  title: { default: "ÆSC Trust", template: "%s | ÆSC" },
  description:
    "ÆSC Trust stewards the research, governance, and grants that advance the Æ law of conserved signal.",
  metadataBase: new URL("https://aesctrust.org"),
  openGraph: {
    title: "ÆSC Trust",
    description:
      "Stewarding conservation over consensus. Research, governance, grants.",
    url: "https://aesctrust.org",
    siteName: "ÆSC Trust",
    images: [{ url: "/aesctrust/og-default.png", width: 1200, height: 630, alt: "ÆSC Trust" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ÆSC Trust",
    description:
      "Research, governance, and grants advancing the Æ law of conserved signal.",
    images: ["/aesctrust/og-default.png"],
  },
  icons: { icon: "/aesctrust/favicon-aesc.ico" },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
  <body
    className={`${inter?.className ?? ""} bg-aesc-bg text-aesc-text antialiased overflow-x-hidden`}
  >
    {/* <SkipLink /> */}
    <Header />
    {children}
  </body>
</html>

  );
}




