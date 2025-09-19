import Image from "next/image";

const badges = [
  { src: "/meshwork/badges/early-node.png", label: "Early Node" },
  { src: "/meshwork/badges/council-member.png", label: "Council Member" },
  { src: "/meshwork/badges/builder.png", label: "Builder" },
  { src: "/meshwork/badges/contributor.png", label: "Contributor" },
  { src: "/meshwork/badges/researcher.png", label: "Researcher" },
  { src: "/meshwork/badges/validator.png", label: "Validator" },           // generate later
  { src: "/meshwork/badges/anchor-node.png", label: "Anchor Node" },       // generate later
  { src: "/meshwork/badges/governance.png", label: "Governance" },         // generate later
  { src: "/meshwork/badges/early-supporter.png", label: "Early Supporter"} // generate later
];

export default function BadgeGallery() {
  return (
    <section className="mt-10">
      <h3 className="text-lg md:text-xl font-semibold">Badges</h3>
      <p className="mt-2 text-sm text-zinc-300">Visible participation markers earned by contributing to the Meshwork.</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {badges.map((b) => (
          <figure key={b.src} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="relative mx-auto h-28 w-28">
              <Image src={b.src} alt={b.label} fill sizes="112px" className="object-contain" />
            </div>
            <figcaption className="mt-3 text-center text-sm">{b.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
