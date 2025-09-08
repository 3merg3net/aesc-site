import Image from "next/image";

export default function DividerGlyph() {
  return (
    <div className="relative my-12 md:my-16 flex items-center justify-center">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
      <div className="px-6">
        <Image
          src="/aesctrust/logo-symbol.png"
          alt="ÆSC divider glyph"
          width={40}
          height={40}
          className="opacity-80"
        />
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
    </div>
  );
}
