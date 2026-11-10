"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Destination {
  _id: string;
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate?: string;
  imageUrl: string;
  description?: string;
  rating?: number;
}

const priceRanges = [
  { value: "all", label: "Any Price" },
  { value: "0-500", label: "Under $500" },
  { value: "500-1000", label: "$500 - $1000" },
  { value: "1000-2000", label: "$1000 - $2000" },
  { value: "2000+", label: "$2000 & Above" },
];

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
];

// `!` (important) overrides beat the shadcn base/variant utilities, which
// Tailwind v4 emits in a fixed order regardless of className order.
const filterTriggerClass =
  "h-10! w-full! justify-between gap-3 rounded-md border-border bg-background! px-3.5 text-xs! font-medium tracking-wide uppercase text-muted-foreground";

// "7 days/ 6 nights" -> "7 Days/6 Nights"
const formatDuration = (duration: string) =>
  duration
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => part.replace(/\b\p{L}/gu, (char) => char.toUpperCase()))
    .join("/");

const DestinationsExplorer = ({
  destinations,
}: {
  destinations: Destination[];
}) => {
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const categories = useMemo(
    () => [
      "all",
      ...Array.from(new Set(destinations.map((item) => item.category))),
    ],
    [destinations]
  );

  const visibleDestinations = useMemo(() => {
    const filtered = destinations.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const price = Number(item.price);

      const matchesPrice =
        priceRange === "all" ||
        (priceRange === "0-500" && price < 500) ||
        (priceRange === "500-1000" && price >= 500 && price < 1000) ||
        (priceRange === "1000-2000" && price >= 1000 && price < 2000) ||
        (priceRange === "2000+" && price >= 2000);

      return matchesCategory && matchesPrice;
    });

    if (sortBy === "price-asc") {
      filtered.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === "name-asc") {
      filtered.sort((a, b) =>
        a.destinationName.localeCompare(b.destinationName)
      );
    }

    return filtered;
  }, [destinations, category, priceRange, sortBy]);

  return (
    <main className="flex-1 px-4 py-12 md:py-16">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="text-3xl font-light tracking-tight md:text-5xl">
          Explore All Destinations
        </h1>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">
          Find your perfect travel experience from our curated collection
        </p>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Select value={category} onValueChange={(value) => setCategory(String(value))}>
            <SelectTrigger className={filterTriggerClass}>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((item) => (
                <SelectItem key={item} value={item}>
                  {item === "all" ? "All Categories" : item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priceRange} onValueChange={(value) => setPriceRange(String(value))}>
            <SelectTrigger className={filterTriggerClass}>
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(value) => setSortBy(String(value))}>
            <SelectTrigger className={filterTriggerClass}>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <p className="mt-5 text-sm text-muted-foreground">
          Showing {visibleDestinations.length} destination
          {visibleDestinations.length === 1 ? "" : "s"}
        </p>

        {visibleDestinations.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No destinations match your filters.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {visibleDestinations.map((destination) => (
              <article key={destination._id} className="group">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={destination.imageUrl}
                    alt={destination.destinationName}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute top-3 right-3 flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs font-medium shadow-sm">
                    {(destination.rating ?? 4.5).toFixed(1)}
                    <Star className="size-3 fill-foreground text-foreground" />
                  </span>
                </div>

                <div className="mt-3">
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="size-3.5" />
                    {destination.country}
                  </p>

                  <div className="mt-1.5 flex items-baseline justify-between gap-3">
                    <h2 className="min-w-0 flex-1 truncate text-base font-medium">
                      {destination.destinationName}
                    </h2>
                    <p className="flex shrink-0 items-baseline gap-0.5">
                      <span className="text-base font-semibold">
                        ${destination.price}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        /Person
                      </span>
                    </p>
                  </div>

                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="size-3.5" />
                    {formatDuration(destination.duration)}
                  </p>

                  <Link
                    href={`/destinations/${destination._id}`}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold tracking-wide uppercase text-brand transition hover:text-brand/80"
                  >
                    Book Now
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default DestinationsExplorer;
