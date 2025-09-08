import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aesctrust.org";
  const pages = [
    "/", "/research", "/grants", "/governance",
    "/ecosystem", "/press", "/source", "/contact",
  ];
  const now = new Date();
  return pages.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "/" ? 1 : 0.7,
  }));
}
