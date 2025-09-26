import PageHeader from "@/components/ui/PageHeader";
export default function SdksHeader() {
  return (
    <PageHeader
      title="SDKs"
      subtitle="TypeScript for apps; Python for data."
      bgSrc="/assets/meshwork/sdks-banner.png"
      height="sm"
      overlay={0.45}
      fit="contain"
    />
  );
}

