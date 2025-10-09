import { clubInfo } from "@/lib/data/club-info";
import Image from "next/image";
import Link from "next/link";

interface HireSectionProps {
  dict: {
    navigation: {
      contact: string;
    };
    hire?: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
    };
  };
}

export default function HireSection({ dict }: HireSectionProps) {
  const title = dict.hire?.title || "Hire 2progi for your next event";
  const subtitle = dict.hire?.subtitle || "Professional event hosting";
  const description =
    dict.hire?.description ||
    "Situated in the vibrant heart of Poznań, with state-of-the-art sound system and professional lighting, multiple bars, and incredible atmosphere throughout the venue, 2progi is one of Poland's most dynamic nightlife destinations. Since opening, the club has been the pulse of Poznań's electronic music scene, hosting unforgettable nights and exclusive events that define the city's nightlife culture.";
  const cta = dict.hire?.cta || dict.navigation.contact;

  return (
    <section className="relative mt-6 flex w-full items-center justify-center overflow-hidden rounded-2xl">
      <Image
        src="/imgs/backgrounds/hire.webp"
        alt={"Hire 2progi background"}
        width={100}
        height={100}
        className="contrast-105 hue-rotate-120 absolute inset-0 -z-10 h-full w-full object-cover opacity-65 blur-lg"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black to-transparent" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-3 text-xs uppercase tracking-[0.2em] text-neutral-300 sm:mb-4 sm:text-sm md:text-base">
            {subtitle}
          </h2>
          <h1 className="mb-4 text-2xl font-bold leading-tight sm:mb-5 sm:text-4xl md:mb-6 md:text-4xl">
            {title}
          </h1>
          <p className="mx-auto mb-6 max-w-2xl text-sm uppercase leading-relaxed opacity-80 sm:mb-7 sm:text-base md:mb-8">
            {description}
          </p>
          <Link
            href={`mailto:${clubInfo.email}`}
            className="inline-block rounded-full border-2 border-[color-mix(in_srgb,var(--primary)_60%,transparent)] bg-[color-mix(in_srgb,var(--primary)_8%,transparent)] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--primary)] transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--primary)_15%,transparent)] sm:px-6 sm:py-3 sm:text-sm"
          >
            {cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
