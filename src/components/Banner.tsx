import Image from "next/image";

export default function Banner({ src, alt }: { src: string; alt?: string }) {
  return (
    <section className="relative w-full h-[200px] sm:h-[160px] md:h-[200px] lg:h-[240px] bg-[#0b0b0c]">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
      <Image
        src={src}
        alt={alt ?? ""}
        fill
        priority
        className="object-contain relative z-10"
        sizes="100vw"
      />
    </section>
  );
}
