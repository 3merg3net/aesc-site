import PageHeader from "@/components/ui/PageHeader";
export default function WizardHeader() {
  return (
    <PageHeader
      title="Signal Wizard"
      subtitle="Genesis → Signature → Go Live."
      bgSrc="/assets/meshwork/wizard-header.png"
      height="md"
      overlay={0.4}
      fit="contain"
    />
  );
}
