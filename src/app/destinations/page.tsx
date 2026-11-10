import React from "react";
import DestinationsExplorer, {
  type Destination,
} from "@/components/DestinationsExplorer";

// Always read the API at request time so new/edited destinations show up
// without rebuilding (the build would otherwise bake the data in once).
export const dynamic = "force-dynamic";

const AllDestination = async () => {
  const res = await fetch("http://localhost:4000/destinations");
  // The API sends a bare array; keep a fallback for a `{ value: [...] }` wrapper.
  const data: unknown = await res.json();
  const destinations: Destination[] = Array.isArray(data)
    ? data
    : ((data as { value?: Destination[] })?.value ?? []);

  return <DestinationsExplorer destinations={destinations} />;
};

export default AllDestination;
