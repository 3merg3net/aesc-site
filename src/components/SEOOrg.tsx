export default function SEOOrg() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ÆSC Trust",
    "url": "https://aesctrust.org",
    "logo": "https://aesctrust.org/aesctrust/icon-512.png",
    "sameAs": [
      "https://x.com/", "https://github.com/", "https://www.linkedin.com/"
    ]
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
