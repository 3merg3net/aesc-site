import PageHeader from "@/components/ui/PageHeader";
export default function ArchetypesHeader() {
  return (
    <PageHeader
      title="Archetypes"
      subtitle="Symbolic patterns that ground Meshwork design."
      bgSrc="/assets/meshwork/banner-archetypes.png"
      height="sm"
      overlay={0.45}
      fit="contain"
    />
  );
}

