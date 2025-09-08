// src/app/layout.js
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./globals.css";
import SEOOrg from "@/components/SEOOrg";
import SkipLink from "@/components/SkipLink";
import { inter } from "./fonts";
<body className={`${inter.className} bg-aesc-bg text-aesc-text antialiased`}></body>



export const metadata = {
  title: "ÆSC Trust",
  description: "ÆSC Trust stewards the research, governance, and grants that advance the Æ law of conserved signal.",
  metadataBase: new URL("https://aesctrust.org"), // change if your domain differs
  openGraph: {
    title: "ÆSC Trust",
    description: "Stewarding conservation over consensus. Research, governance, grants.",
    url: "https://aesctrust.org",
    siteName: "ÆSC Trust",
    images: [
      {
        url: "/aesctrust/og-default.png", // make a 1200x630 OG image
        width: 1200,
        height: 630,
        alt: "ÆSC Trust",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ÆSC Trust",
    description: "Research, governance, and grants advancing the Æ law of conserved signal.",
    images: ["/aesctrust/og-default.png"],
  },
  icons: {
    icon: "/aesctrust/favicon-aesc.ico",
  },
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-aesc-bg text-aesc-text antialiased">
         <SkipLink />
  <Header />
  {children}
  <Footer />
  <SEOOrg />
</body>
    </html>
  );
}




