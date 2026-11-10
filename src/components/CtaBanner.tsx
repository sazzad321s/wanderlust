import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="relative flex min-h-72 items-center justify-center overflow-hidden bg-neutral-950 px-6 py-14">
      <Image
        src="/CTA.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/60" aria-hidden />

      <div className="relative z-10 flex flex-col items-center text-center">
        <h2 className="text-4xl font-light tracking-tight text-white md:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-3 text-sm text-white/80 md:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Link
          href="/destinations"
          className="mt-8 inline-flex items-center gap-3 rounded-md bg-white px-6 py-3 text-sm font-medium tracking-wide text-neutral-900 uppercase shadow-lg transition hover:bg-neutral-100"
        >
          Book Your Trip Today
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
