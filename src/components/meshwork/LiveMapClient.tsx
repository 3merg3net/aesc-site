"use client";

import dynamic from "next/dynamic";

// Load the actual Leaflet map only on the client
const LiveMap = dynamic(() => import("./LiveMap"), { ssr: false });

export default LiveMap;
