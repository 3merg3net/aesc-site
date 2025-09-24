"use client";

type Props = {
  text: string;
  size?: number;      // default 256
  margin?: number;    // default 1
  format?: "png" | "svg"; // default "png"
  className?: string;
  title?: string;
};

export default function QRCodeImg({
  text,
  size = 256,
  margin = 1,
  format = "png", // safest for next/image pipelines
  className,
  title,
}: Props) {
  const qs = new URLSearchParams({
    text: encodeURIComponent(text),
    size: String(size),
    margin: String(margin),
    format,
  }).toString();

  // Use <img> to avoid next/image optimization pathway issues
  return (
    <img
      src={`/api/qr?${qs}`}
      alt={title || "QR code"}
      className={className ?? "block"}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      style={{ imageRendering: "crisp-edges" }}
    />
  );
}
