import { SocialLinks } from "@/components/Containers/SocialLinks";
import Map from "@/components/UI/Map/Map";
import { clubInfo } from "@/lib/data/club-info";
import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/lib/i18n-config";
import Image from "next/image";
import Link from "next/link";
import { TestimonialCarousel } from "./_components/Testimonials";

type Props = { params: Promise<{ lang: Locale }> };

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <div className="flex flex-col gap-8">
      <div className="relative flex min-h-[40dvh] items-center justify-center overflow-hidden rounded-xl">
        <Image
          src="/imgs/backgrounds/about.webp"
          alt={dict.about.title}
          width={100}
          height={100}
          className="absolute inset-0 -z-10 h-full w-full object-cover blur"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black to-transparent" />
        <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-4xl font-extrabold uppercase tracking-tight">
            {dict.about.title}
          </h1>
          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/80">
            {dict.about.slogan}
          </p>
        </div>
      </div>

      <section className="container relative mx-auto overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--primary)_25%,transparent)] p-6 lg:p-8">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_320px_at_85%_120%,color-mix(in_srgb,var(--primary)_18%,transparent),transparent)]" />
        <div className="grid items-start gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase tracking-[0.25em] text-white/60">
              {dict.about.subtitle}
            </span>
            <h2 className="text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-4xl">
              2Progi
            </h2>
            <p className="max-w-prose text-sm text-white/80">
              {dict.about.description}
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href={`/${lang}/events`}
                className="rounded-full border border-[color-mix(in_srgb,var(--primary)_40%,transparent)] bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] px-5 py-2 font-semibold text-[var(--primary)] hover:bg-[color-mix(in_srgb,var(--primary)_18%,transparent)]"
              >
                {dict.hero.cta}
              </Link>
              <Link
                href={`/${lang}/faq`}
                className="rounded-full border border-white/20 px-5 py-2 font-semibold text-white/90 hover:bg-white/5"
              >
                {dict.navigation.faq}
              </Link>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-1 text-sm">
              <h3 className="text-xs uppercase tracking-wide text-white/60">
                {dict.navigation.contact}
              </h3>
              <p className="text-white/90">
                {/* {dict.footer.address.replace(/<br>/g, ", ")} */}
                {`${clubInfo.address.street}, ${clubInfo.address.postalCode} ${clubInfo.address.city}`}
              </p>
            </div>
            <div className="grid gap-1 text-sm">
              <h3 className="text-xs uppercase tracking-wide text-white/60">
                {dict.footer.phone}
              </h3>
              <a
                href={`tel:${clubInfo.phone}`}
                className="text-white/90 hover:text-[var(--primary)]"
              >
                {clubInfo.phone}
              </a>
            </div>
            <div className="grid gap-1 text-sm">
              <h3 className="text-xs uppercase tracking-wide text-white/60">
                {dict.contact.email}
              </h3>
              <a
                href={`mailto:${clubInfo.email}`}
                className="text-white/90 hover:text-[var(--primary)]"
              >
                {clubInfo.email}
              </a>
            </div>
            <div className="grid gap-1 text-sm">
              <h3 className="text-xs uppercase tracking-wide text-white/60">
                {/* {dict.contact.email} */}
                {dict.footer.followUs}
              </h3>
              <SocialLinks />
            </div>
          </div>
        </div>
      </section>

      {/* Bento Gallery */}
      <section className="container mx-auto flex flex-col gap-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">
              {dict.about.gallery.title}
            </h2>
          </div>
        </div>
        {(() => {
          const base: Array<{ src: string; alt: string }> = [
            { src: "/imgs/interior/2.webp", alt: "Club entrance" },
            { src: "/imgs/interior/1.webp", alt: "Bar" },
            { src: "/imgs/interior/3.webp", alt: "Interior" },
            { src: "/imgs/interior/4.webp", alt: "Interior" },
            { src: "/imgs/interior/5.webp", alt: "Interior" },
            { src: "/imgs/interior/6.webp", alt: "Interior" },
            { src: "/imgs/interior/7.webp", alt: "Interior" },
          ];
          const spans = [
            "sm:col-span-2 sm:row-span-3",
            "sm:col-span-1 sm:row-span-1",
            "sm:col-span-1 sm:row-span-4",
            "sm:col-span-1 sm:row-span-2",
            "sm:col-span-1 sm:row-span-2",
            "sm:col-span-2 sm:row-span-2",
            "sm:col-span-1 sm:row-span-1",
          ];
          return (
            <div className="grid grid-cols-1 gap-3 [grid-auto-rows:140px] sm:grid-cols-4 sm:[grid-auto-rows:120px] md:[grid-auto-rows:140px]">
              {base.map((it, i) => (
                <div
                  key={`${it.src}-${i}`}
                  className={`group overflow-hidden rounded-xl border border-white/10 ${spans[i % spans.length]}`}
                >
                  <Image
                    src={it.src}
                    alt={it.alt}
                    width={800}
                    height={800}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          );
        })()}
      </section>

      {/* Testimonials */}
      <section className="container mx-auto flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold">
            {dict.about.testimonials.title}
          </h2>
          <p className="text-sm text-white/70">
            {dict.about.testimonials.subtitle}
          </p>
        </div>

        <TestimonialCarousel reviews={dict.about.testimonials.reviews} />
      </section>

      {/* Spotify Playlists */}
      <section className="container mx-auto flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold">{dict.about.playlist.title}</h2>
          <p className="text-sm text-white/70">
            {dict.about.playlist.subtitle}
          </p>
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <iframe
            title="2progi playlist 1"
            src="https://open.spotify.com/embed/playlist/37i9dQZF1DWSXMERUaiq9M?utm_source=generator"
            width="100%"
            className="h-[152px] md:h-[450px]" // 👈 тут магия
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
          <iframe
            title="2progi playlist 2"
            src="https://open.spotify.com/embed/playlist/37i9dQZF1DX7SEhw42DW5b?utm_source=generator"
            width="100%"
            className="h-[152px] md:h-[450px]"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      </section>
      <section className="container mx-auto flex flex-col gap-4">
        <h2 className="text-xl font-semibold">{dict.about.residents}</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { name: "DJ Kira", img: "/imgs/residents/1.webp" },
            { name: "Neon Wave", img: "/imgs/residents/2.webp" },
            { name: "Ghost Unit", img: "/imgs/residents/3.webp" },
            { name: "MC Nova", img: "/imgs/residents/4.webp" },
          ].map((a, i) => (
            <figure
              key={i}
              className="group relative aspect-video overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--primary)_20%,transparent)]"
            >
              <Image
                src={a.img}
                alt={a.name}
                width={300}
                height={300}
                className="duration-400 h-full w-full object-cover object-center transition group-hover:scale-105"
              />
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between p-4 text-sm font-bold">
                {a.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className="relative overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--primary)_25%,transparent)] p-6">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(800px_260px_at_80%_120%,color-mix(in_srgb,var(--primary)_20%,transparent),transparent)]" />
        <div className="flex flex-col items-center gap-3 text-center">
          <h3 className="text-2xl font-extrabold uppercase tracking-tight">
            {dict.hero.cta}
          </h3>
          <p className="max-w-xl text-sm text-white/80">
            {dict.hero.description}
          </p>
          <Link
            href={`/${lang}/events`}
            className="rounded-full border border-[color-mix(in_srgb,var(--primary)_40%,transparent)] bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] px-5 py-2 font-semibold text-[var(--primary)] hover:bg-[color-mix(in_srgb,var(--primary)_15%,transparent)]"
          >
            {dict.events.title}
          </Link>
        </div>
      </section>
      <div>
        <Map />
      </div>
    </div>
  );
}
