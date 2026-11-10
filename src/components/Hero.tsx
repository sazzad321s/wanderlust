import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const searchFields = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime/3 Days" },
  { label: "Budget", value: "$0-$3000" },
  { label: "People", value: "5-10" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-3.5rem)] flex-col overflow-hidden">
      <Image
        src="/Banner.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 " aria-hidden />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-16 pb-24 text-center">
        <h1 className="max-w-4xl text-5xl font-light leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/90 md:text-base">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 rounded-md bg-brand px-7 py-2.5 text-sm font-medium tracking-wide text-white uppercase transition hover:bg-brand/90"
          >
            Explore Now
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 rounded-md bg-white/20 px-7 py-2.5 text-sm font-medium tracking-wide text-white uppercase backdrop-blur-sm transition hover:bg-white/30"
          >
            View Destination
          </Link>
        </div>
      </div>

      <div className="relative z-10 flex flex-col border-t border-white/10 bg-black/50 backdrop-blur-sm md:flex-row">
        {searchFields.map((field, index) => (
          <div
            key={field.label}
            className={`flex-1 px-6 py-3 text-left ${
              index > 0 ? "border-t border-white/15 md:border-t-0 md:border-l" : ""
            }`}
          >
            <p className="text-sm font-medium text-white">{field.label}</p>
            <p className="mt-0.5 text-xs text-white/70">{field.value}</p>
          </div>
        ))}
        <button
          type="button"
          className="bg-brand px-10 py-3 text-sm font-medium text-white transition hover:bg-brand/90 md:py-0"
        >
          Search
        </button>
      </div>
    </section>
  );
}
