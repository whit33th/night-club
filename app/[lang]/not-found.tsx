import Link from "next/link";
export default function NotFound() {
  return (
    <section className="from-primary/10 relative flex h-[calc(100dvh-56px-32px)] flex-col items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b to-transparent to-20%">
      <div className="pointer-events-none absolute inset-0 -z-10" />
      <h1 className="text-[72px] font-extrabold leading-none tracking-tight text-white drop-shadow-[0_0_40px_var(--primary)] md:text-[112px]">
        404
      </h1>
      <p className="mt-2 text-sm uppercase tracking-[0.25em] text-white/80">
        Page not found
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
    </section>
  );
}
