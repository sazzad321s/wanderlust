"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  CalendarDays,
  Check,
  MapPin,
  Star,
  
} from "lucide-react";

import type { Destination } from "@/components/DestinationsExplorer";
import UpdateDestinationDetails from "@/components/UpdateDestinationDetails";
import DeleteDestinationDialog from "@/components/DeleteDestinationDialog";
import BookingCard from "./BookingCard";

const highlights = [
  "Luxury beachfront accommodation",
  "Visit Uluwatu Temple at sunset",
  "Traditional Balinese spa treatment",
  "Private beach dinner experience",
  "Sunrise trek to Mount Batur",
];



/** "7 days/ 6 nights" → "7 Days / 6 Nights" */
const formatDuration = (duration: string) =>
  duration
    .split("/")
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => p.replace(/\b\p{L}/gu, (c) => c.toUpperCase()))
    .join(" / ");

/** ISO date → "MM/DD/YYYY" */


export default function DestinationDetails({
  destination,
}: {
  destination: Destination;
}) {
 

  return (
    <main className="flex-1 px-4 py-10 md:py-14">
      <div className="mx-auto w-full max-w-5xl">
        {/* ── Top bar ── */}
        <div className="flex items-center justify-between">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to Destinations
          </Link>

          <div className="flex items-center gap-2">
            <UpdateDestinationDetails destination={destination} />
            <DeleteDestinationDialog destination={destination}/>
            
          </div>
        </div>

        {/* ── Hero image ── */}
        <div className="relative mt-6 aspect-5/2 overflow-hidden rounded-xl bg-muted">
          <Image
            src={destination.imageUrl}
            alt={destination.destinationName}
            fill
            sizes="(min-width: 1024px) 960px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* ── Content grid ── */}
        <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-[1fr_300px]">
          {/* Left column */}
          <div>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4" />
              {destination.country}
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              {destination.destinationName}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                <span className="font-medium text-foreground">
                  {(destination.rating ?? 4.9).toFixed(1)}
                </span>{" "}
                (234 reviews)
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-4" />
                {formatDuration(destination.duration)}
              </span>
            </div>

            {/* Overview */}
            <h2 className="mt-8 text-lg font-semibold italic">Overview</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {destination.description ??
                "No description available for this destination."}
            </p>

            {/* Highlights */}
            <h2 className="mt-8 text-lg font-semibold italic">Highlights</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {destination.description ??
                "No description available for this destination."}
            </p>
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {highlights.map((item) => (
                <p
                  key={item}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* Right column — Booking card */}
         <BookingCard destination={destination}/>
        </div>
      </div>
    </main>
  );
}

