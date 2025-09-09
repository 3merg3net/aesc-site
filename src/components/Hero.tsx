import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full">
      {/* Responsive heights per breakpoint */}
      <div className="relative w-full h-[220px] sm:h-[280px] md:h-[380px] lg:h-[480px] xl:h-[560px]">
        <Image
          src="/hero/aeverse-hero.png"  // put the image under /public/hero/ and match the case exactly
          alt="ÆSC"
          fill
          sizes="100vw"
          quality={90}
          className="object-cover object-center"
        />
      </div>
      {/* Optional bottom fade into background for legibility */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-aesc-bg to-transparent" />
    </section>
  );
}
