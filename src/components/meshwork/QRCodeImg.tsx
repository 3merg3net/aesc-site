"use client";
import Image from "next/image";

export default function QRCodeImg({
  text,
  size = 224,
  className = "",
  fg = "E6E6E6",        // module color (gold/gray)
  bg = "00000000",      // transparent
  format = "png",       // or "svg"
  title = "QR",
}: {
  text: string;
  size?: number;
  className?: string;
  fg?: string;
  bg?: string;
  format?: "png" | "svg";
  title?: string;
}) {
  const src = `/api/qr?text=${encodeURIComponent(text)}&size=${size}&fg=${fg}&bg=${bg}&format=${format}`;
  return (
    <div className={className} title={title}>
      <div className="relative" style={{ width: size, height: size }}>
        <Image src={src} alt={title} fill className="object-contain" />
      </div>
    </div>
  );
}

