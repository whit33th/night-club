import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden rounded-xl">
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black to-transparent" />

      <div className="relative grid place-items-center px-6 py-10 text-center">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_400px_at_50%_-50%,color-mix(in_srgb,var(--primary)_25%,transparent),transparent)]" />
        <h1 className="text-[72px] font-extrabold leading-none tracking-tight text-white drop-shadow-[0_0_40px_var(--primary)] md:text-[112px]">
          404
        </h1>
        <p className="mt-2 text-sm uppercase tracking-[0.25em] text-white/80">
          Page not found — After Dark · Neon Heart · No Sleep Club
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-full border border-[color-mix(in_srgb,var(--primary)_40%,transparent)] bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] px-4 py-2 font-semibold text-[var(--primary)] transition hover:bg-[color-mix(in_srgb,var(--primary)_15%,transparent)]"
          >
            Go Home
          </Link>
          <Link
            href="/events"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-semibold text-white/85 transition hover:bg-white/15"
          >
            Browse Events
          </Link>
        </div>
      </div>
    </section>
  );
}
