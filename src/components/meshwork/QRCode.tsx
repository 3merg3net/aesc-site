"use client";

import React from "react";

type Props = {
  text: string;
  size?: number;      // pixels
  format?: "png" | "svg";
  className?: string;
  title?: string;
  margin?: number;
};

export default function QRCodeImg({
  text,
  size = 224,
  format = "png",
  margin = 1,
  className = "",
  title = "QR code",
}: Props) {
  const src = `/api/qr?text=${encodeURIComponent(text)}&size=${size}&format=${format}&margin=${margin}`;
  // For svg, <img> is fine since the route serves image/svg+xml
  return <img src={src} alt={title} title={title} width={size} height={size} className={className} />;
}
