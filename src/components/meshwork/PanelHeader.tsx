import PageHeader from "@/components/ui/PageHeader";
export default function PanelHeader() {
  return (
    <PageHeader
      title="Mesh Panel"
      subtitle="Locate, confirm, and share your latest Signal."
      bgSrc="/assets/meshwork/panel-header.png"
      height="sm"
      overlay={0.45}
      fit="contain"
    />
  );
}
