import Image from "next/image";

export default function Banner({ src, alt }: { src: string; alt?: string }) {
  return (
    <section className="relative">
      <Image
        src={src}
        alt={alt ?? ""}
        width={1600}
        height={600}
        priority
        className="w-full h-[300px] md:h-[360px] object-cover rounded-none"
      />
    </section>
  );
}
