"use client";

import { Suspense } from "react";
import MeshPanel from "./MeshPanel";

export default function MeshPanelIsland() {
  return (
    <Suspense fallback={null}>
      <MeshPanel />
    </Suspense>
  );
}
