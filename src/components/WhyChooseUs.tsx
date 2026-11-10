import Image from "next/image";

const reasons = [
  {
    icon: "/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you whenever your journey takes you.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#e8f6fa] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-4xl font-medium tracking-tight md:text-5xl">
          Why Choose Wanderlust
        </h2>
        <p className="mt-3 text-sm text-neutral-500 md:text-base">
          Your trusted partner for exceptional travel experiences
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reasons.map((reason) => (
            <article
              key={reason.title}
              className="rounded-lg bg-white p-7 text-left shadow-sm"
            >
              <Image
                src={reason.icon}
                alt=""
                width={36}
                height={36}
                className="size-9"
                aria-hidden
              />
              <h3 className="mt-5 text-xl">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                {reason.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
