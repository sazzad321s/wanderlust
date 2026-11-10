import React from "react";
import { notFound } from "next/navigation";
import DestinationDetails from "@/components/DestinationDetails";
import type { Destination } from "@/components/DestinationsExplorer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { log } from "console";
import { getTokenFromServer } from "@/lib/getTokenFromServer";



export const dynamic = "force-dynamic";

const DestinationDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  let destination: Destination | null = null;

  const token = await getTokenFromServer();

  try {
    const res = await fetch(`http://localhost:4000/destinations/${id}`, {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`
      }
    });

    if (res.ok) {
      const data: unknown = await res.json();
      destination =
        (data as { value?: Destination })?.value ?? (data as Destination);
    }
  } catch (error) {
    console.error("Error fetching destination:", error);
  }

  if (!destination || !destination._id) {
    notFound();
  }

  return <DestinationDetails destination={destination} />;
};

export default DestinationDetailsPage;
