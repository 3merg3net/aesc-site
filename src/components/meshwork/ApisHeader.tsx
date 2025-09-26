import PageHeader from "@/components/ui/PageHeader";
export default function ApisHeader() {
  return (
    <PageHeader
      title="APIs & Events"
      subtitle="Simple REST, event streams, and live subscriptions (roadmap)."
      bgSrc="/assets/meshwork/apis-banner.png"
      height="sm"
      overlay={0.45}
      fit="contain"
    />
  );
}

