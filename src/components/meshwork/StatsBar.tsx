import Image from "next/image";

export default function SectionDivider({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mb-6 flex items-center justify-center">
      <Image src={src} alt={alt} width={720} height={128} className="opacity-90" />
    </div>
  );
}
