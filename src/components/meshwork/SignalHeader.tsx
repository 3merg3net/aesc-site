import PageHeader from "@/components/ui/PageHeader";
export default function SignalHeader() {
  return (
    <PageHeader
      title="Signal Profile"
      subtitle="Identity, QR, and your Signal Chain."
      bgSrc="/assets/meshwork/signal-profile-banner.png"
      height="md"
      overlay={0.4}
      fit="contain"
    />
  );
}

