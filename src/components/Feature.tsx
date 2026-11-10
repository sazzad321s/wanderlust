"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, Clock, MapPin, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

export interface FeaturedDestination {
  _id: string;
  destinationName: string;
  country: string;
  category: string;
  price: string;
  oldPrice?: string;
  duration: string;
  departureDate?: string;
  imageUrl: string;
  description?: string;
  rating?: number;
}

// "6 days/ 5 nights" -> "6 Days / 5 Nights"
const formatDuration = (duration: string) =>
  duration
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => part.replace(/\b\p{L}/gu, (char) => char.toUpperCase()))
    .join(" / ");

// "2026-04-18" -> "Apr 18, 2026" (falls back to the raw value when unparsable)
const formatDate = (value?: string) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const Feature = () => {
  const [destinations, setDestinations] = useState<FeaturedDestination[]>([]);
  const [loading, setLoading] = useState(true);
  const [api, setApi] = useState<CarouselApi>();
  const [currentSnap, setCurrentSnap] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("http://localhost:4000/feature-destinations");
        const data: unknown = await res.json();
        // The API sends a bare array; keep a fallback for a `{ value: [...] }` wrapper.
        const list: FeaturedDestination[] = Array.isArray(data)
          ? data
          : ((data as { value?: FeaturedDestination[] })?.value ?? []);
        if (!cancelled) setDestinations(list);
      } catch {
        // Leave the section empty on failure; the rest of the page still renders.
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrentSnap(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <section className="bg-white px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-4xl font-medium tracking-tight md:text-5xl">
              Featured Destinations
            </h2>
            <p className="mt-3 text-sm text-neutral-500 md:text-base">
              Hand-picked travel experiences for the season ahead
            </p>
          </div>
          <Link
            href="/destinations"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-xs font-medium tracking-wide uppercase transition hover:bg-muted"
          >
            All Destinations
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {[0, 1].map((item) => (
              <div key={item} className="space-y-3">
                <Skeleton className="aspect-[16/10] w-full rounded-xl" />
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-3 w-28" />
              </div>
            ))}
          </div>
        ) : destinations.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed px-6 py-14 text-center">
            <p className="text-sm text-muted-foreground">
              No featured destinations yet. Check back soon for hand-picked
              trips.
            </p>
            <Link
              href="/destinations"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-xs font-medium tracking-wide text-white uppercase transition hover:bg-brand/90"
            >
              Browse All Destinations
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        ) : (
          <Carousel
            className="mt-10"
            opts={{ align: "start", loop: false }}
            setApi={setApi}
          >
            <CarouselContent>
              {destinations.map((destination) => {
                const departure = formatDate(destination.departureDate);

                return (
                  <CarouselItem
                    key={destination._id}
                    className="md:basis-[calc(50%-16px)]"
                  >
                    <article className="group h-full">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
                        <Image
                          src={destination.imageUrl}
                          alt={destination.destinationName}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {destination.category && (
                          <span className="absolute top-3 left-3 rounded-md bg-brand px-2 py-1 text-[11px] font-medium tracking-wide text-white uppercase">
                            {destination.category}
                          </span>
                        )}
                        <span className="absolute top-3 right-3 flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs font-medium shadow-sm">
                          {(destination.rating ?? 4.9).toFixed(1)}
                          <Star className="size-3 fill-foreground text-foreground" />
                        </span>
                      </div>

                      <div className="mt-3">
                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="size-3.5" />
                          {destination.country}
                        </p>

                        <div className="mt-1 flex items-baseline justify-between gap-3">
                          <h3 className="min-w-0 flex-1 truncate text-base font-medium">
                            {destination.destinationName}
                          </h3>
                          <p className="flex shrink-0 items-baseline gap-1.5">
                            {destination.oldPrice && (
                              <span className="text-xs text-muted-foreground line-through">
                                ${destination.oldPrice}
                              </span>
                            )}
                            <span className="text-base font-semibold">
                              ${destination.price}
                            </span>
                            <span className="text-[11px] text-muted-foreground">
                              /Person
                            </span>
                          </p>
                        </div>

                        <div className="mt-2 flex items-end justify-between gap-3">
                          <div className="space-y-1">
                            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Clock className="size-3.5" />
                              {formatDuration(destination.duration)}
                            </p>
                            {departure && (
                              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <CalendarDays className="size-3.5" />
                                Departs {departure}
                              </p>
                            )}
                          </div>

                          <Link
                            href={`/destinations/${destination._id}`}
                            className="group/link inline-flex shrink-0 items-center gap-1 text-xs font-semibold tracking-wide text-brand uppercase transition hover:text-brand/80"
                          >
                            Show More
                            <ArrowRight className="size-3.5 transition-transform group-hover/link:translate-x-0.5" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground" aria-live="polite">
                {Math.min(currentSnap + 1, destinations.length)}/
                {destinations.length}
              </p>
              <div className="flex items-center gap-3">
                <CarouselPrevious size="icon-lg" className="static" />
                <CarouselNext size="icon-lg" className="static" />
              </div>
            </div>
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default Feature;
