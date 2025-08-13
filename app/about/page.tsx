import Map from "@/components/UI/Map/Map";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="relative flex min-h-[40dvh] items-center justify-center overflow-hidden rounded-xl">
        <Image
          src="/imgs/1.jpg"
          alt="Club"
          width={100}
          height={100}
          className="absolute inset-0 -z-10 h-full w-full object-cover blur"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black to-transparent" />
        <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-4xl font-extrabold uppercase tracking-tight">
            About the Club
          </h1>
          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/80">
            After Dark · Neon Heart · No Sleep Club
          </p>
        </div>
      </section>

      <section className="container relative mx-auto overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--primary)_25%,transparent)] p-6 lg:p-8">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_320px_at_85%_120%,color-mix(in_srgb,var(--primary)_18%,transparent),transparent)]" />
        <div className="grid items-start gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase tracking-[0.25em] text-white/60">
              Boundless Nights
            </span>
            <h2 className="text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-4xl">
              2Progi — Night Euphoria
            </h2>
            <p className="max-w-prose text-sm text-white/80">
              Dive into the pulse of Poznań’s night. Our club is where magic
              meets music and every corner hums with energy. Cross the threshold
              into a world where nights feel shorter and memories linger longer.
              Let yourself be carried away and write your own nocturnal chapter
              in the heart of Poznań.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/events"
                className="rounded-full border border-[color-mix(in_srgb,var(--primary)_40%,transparent)] bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] px-5 py-2 font-semibold text-[var(--primary)] hover:bg-[color-mix(in_srgb,var(--primary)_18%,transparent)]"
              >
                Explore Events
              </Link>
              <Link
                href="/faq"
                className="rounded-full border border-white/20 px-5 py-2 font-semibold text-white/90 hover:bg-white/5"
              >
                FAQ
              </Link>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-1 text-sm">
              <h3 className="text-xs uppercase tracking-wide text-white/60">
                Visit
              </h3>
              <p className="text-white/90">Address: 123 Event St., Main Hall</p>
            </div>
            <div className="grid gap-1 text-sm">
              <h3 className="text-xs uppercase tracking-wide text-white/60">
                Hours
              </h3>
              <p className="text-white/90">Thu–Sun · 22:00–06:00</p>
            </div>
            <div className="grid gap-1 text-sm">
              <h3 className="text-xs uppercase tracking-wide text-white/60">
                Contact
              </h3>
              <Link
                href="mailto:hello@nightclub.test"
                className="text-white/90 hover:text-[var(--primary)]"
              >
                hello@nightclub.test
              </Link>
            </div>
            <div className="grid gap-1 text-sm">
              <h3 className="text-xs uppercase tracking-wide text-white/60">
                Tel
              </h3>
              <a
                href="tel:+48123456789"
                className="text-white/90 hover:text-[var(--primary)]"
              >
                +48 123 456 789
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Residents</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { name: "DJ Kira", img: "/imgs/residents/1.png" },
            { name: "Neon Wave", img: "/imgs/residents/2.png" },
            { name: "Ghost Unit", img: "/imgs/residents/3.png" },
            { name: "MC Nova", img: "/imgs/residents/4.png" },
          ].map((a, i) => (
            <div
              key={i}
              className="group relative aspect-video overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--primary)_20%,transparent)]"
            >
              <Image
                src={a.img}
                alt={a.name}
                width={1200}
                height={900}
                className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between p-4">
                <p className="text-lg font-bold">{a.name}</p>
                <span className="backdrop-blur-xs rounded-full border border-[color-mix(in_srgb,var(--primary)_40%,transparent)] bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] px-3 py-1 text-xs font-semibold text-[var(--primary)]">
                  Resident
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--primary)_25%,transparent)] p-6">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(800px_260px_at_80%_120%,color-mix(in_srgb,var(--primary)_20%,transparent),transparent)]" />
        <div className="flex flex-col items-center gap-3 text-center">
          <h3 className="text-2xl font-extrabold uppercase tracking-tight">
            Join the Night
          </h3>
          <p className="max-w-xl text-sm text-white/80">
            Experience the atmosphere up close — discover upcoming nights and
            secure your spot.
          </p>
          <Link
            href="/events"
            className="rounded-full border border-[color-mix(in_srgb,var(--primary)_40%,transparent)] bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] px-5 py-2 font-semibold text-[var(--primary)] hover:bg-[color-mix(in_srgb,var(--primary)_15%,transparent)]"
          >
            Browse Events
          </Link>
        </div>
      </section>
      <Map />
    </div>
  );
}
