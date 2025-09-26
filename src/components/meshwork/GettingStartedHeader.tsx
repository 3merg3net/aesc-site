import PageHeader from "@/components/ui/PageHeader";
export default function GettingStartedHeader() {
  return (
    <PageHeader
      title="You're Signal Awaits"
      subtitle="Create your genesis,
       sign your first Signal."
      bgSrc="/assets/meshwork/banner-getting-started.png"
      height="md"
      overlay={0.4}
      fit="contain"
      priority
    />
  );
}



