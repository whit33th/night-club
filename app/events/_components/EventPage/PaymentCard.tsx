"use client";

import Image from "next/image";
import Link from "next/link";

type PaymentCardProps = {
  basePrice?: number;
  currency?: string;
  imageSrc?: string;
  title?: string;
  ticketUrl?: string;
};

export default function PaymentCard({
  basePrice = 20,
  currency = "PLN",
  imageSrc,
  title = "General Admission",
  ticketUrl,
}: PaymentCardProps) {
  return (
    <section
      className="relative w-full overflow-hidden rounded-xl bg-neutral-900/15 p-0 shadow-xl backdrop-blur"
      aria-label="Ticket purchase"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_300px_at_50%_-20%,color-mix(in_srgb,var(--primary)_18%,transparent),transparent)]" />
      {/* top shimmer */}
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-40" />

      <div className="flex items-stretch">
        {/* Left: square visual */}
        <div className="group relative aspect-square w-36 flex-shrink-0 overflow-hidden rounded-l-lg bg-white/5 md:w-48">
          {imageSrc ? (
            <Image
              width={200}
              height={200}
              src={imageSrc}
              alt={title}
              className="h-full w-full object-cover opacity-90 invert transition duration-300 group-hover:scale-[1.04] group-hover:opacity-100"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-xs uppercase tracking-[0.25em] text-white/50">
              Ticket
            </div>
          )}
          {/* highlight */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(240px_140px_at_30%_20%,white/15,transparent)]" />
        </div>

        {/* Right: content and controls */}
        <div className="flex w-full min-w-0 flex-1 flex-col justify-center p-5">
          <header className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold uppercase tracking-tight">
                Tickets
              </h2>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-white/70">
              Limited
            </span>
          </header>

          <div className="flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-center">
            {basePrice ? (
              <div className="text-center sm:text-left">
                <p className="text-[10px] uppercase tracking-widest text-neutral-400">
                  Price from:
                </p>
                <p className="text-xl font-extrabold text-white">
                  {basePrice} {currency}
                </p>
              </div>
            ) : null}
            <div className="text-xs text-neutral-400 sm:text-right">
              {ticketUrl ? null : <p>Free entry — no purchase required.</p>}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:justify-end">
            {ticketUrl ? (
              <Link
                href={ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--primary)_45%,transparent)] bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] px-6 py-2 text-center text-sm font-semibold text-[var(--primary)] backdrop-blur-sm transition hover:bg-[color-mix(in_srgb,var(--primary)_18%,transparent)] focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--primary)_45%,transparent)] focus:ring-offset-0"
              >
                Buy tickets
              </Link>
            ) : (
              <span className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-2 text-center text-sm font-semibold text-white/80">
                No ticket needed
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
