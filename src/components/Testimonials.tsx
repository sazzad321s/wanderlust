"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      "\"The Bali Trip Was Absolutely Magic! Every Detail Was Perfectly Planned. The Resorts Were Luxurious, And The Cultural Experiences Were Unforgettable.\"",
    name: "Michael Chen",
    location: "Singapore",
    image:
      "https://images.pexels.com/photos/9533888/pexels-photo-9533888.jpeg?auto=compress&cs=tinysrgb&w=560&h=440&fit=crop&crop=faces",
  },
  {
    quote:
      "\"Swiss Alps Adventure Exceeded All Expectations! The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!\"",
    name: "Sarah Johnson",
    location: "New York, USA",
    image:
      "https://images.pexels.com/photos/2520446/pexels-photo-2520446.jpeg?auto=compress&cs=tinysrgb&w=560&h=440&fit=crop&crop=faces",
  },
  {
    quote:
      "\"Kenya Safari Went Beyond Our Dreams! Every Detail Was Handled With Care, From The Lodges To The Wildlife Guides. An Unforgettable Journey From Start To Finish.\"",
    name: "Aisha Rahman",
    location: "Toronto, Canada",
    image:
      "https://images.pexels.com/photos/31887155/pexels-photo-31887155.jpeg?auto=compress&cs=tinysrgb&w=560&h=440&fit=crop&crop=faces",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white px-6 py-16 md:py-20">
      <Carousel className="mx-auto max-w-6xl">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="text-4xl font-light tracking-tight md:text-5xl">
              What Travelers Say
            </h2>
            <p className="mt-3 text-sm text-neutral-500 md:text-base">
              Real experiences from our happy travelers
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3 pt-2">
            <CarouselPrevious size="icon-lg" className="static" />
            <CarouselNext size="icon-lg" className="static" />
          </div>
        </div>

        <CarouselContent className="mt-10">
          {testimonials.map((testimonial) => (
            <CarouselItem
              key={testimonial.name}
              className="md:basis-[calc(50%-16px)]"
            >
              <figure className="flex h-full gap-5 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="flex min-w-0 flex-1 flex-col">
                  <blockquote className="text-[13px] leading-relaxed text-neutral-700">
                    {testimonial.quote}
                  </blockquote>
                  <figcaption className="mt-auto pt-6">
                    <p className="text-sm text-brand">— {testimonial.name}</p>
                    <p className="mt-0.5 text-xs text-neutral-500">
                      {testimonial.location}
                    </p>
                  </figcaption>
                </div>
                <div className="relative w-40 shrink-0 self-stretch md:w-44">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    sizes="176px"
                    className="rounded-lg object-cover"
                  />
                </div>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
