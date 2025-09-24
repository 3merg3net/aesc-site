// app/u/[nodeId]/page.tsx
import { redirect } from "next/navigation";

export default function Page({ params }: { params: { nodeId: string } }) {
  redirect(`/signal/${encodeURIComponent(params.nodeId)}`);
}




