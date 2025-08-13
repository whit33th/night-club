"use client";

import { motion } from "framer-motion";
import WriteEffectText from "@/components/Effects/WriteEffectText";

export default function FaqPage() {
  const faqs = [
    { q: "Age restrictions?", a: "18+ only. ID required." },
    { q: "Dress code?", a: "Smart casual. No sportswear." },
    {
      q: "Refunds?",
      a: "Tickets are non-refundable unless event is canceled.",
    },
    { q: "Payment methods?", a: "Cards and contactless accepted at the bar." },
    { q: "Door policy?", a: "Management reserves the right of admission." },
  ];

  return (
    <div className="relative mx-auto max-w-3xl px-4 pb-16 pt-8 sm:pt-14">
      {/* Header */}
      <header className="relative mb-10 sm:mb-14">
        <h1 className="text-center text-5xl font-black uppercase tracking-tight sm:text-6xl">
          FAQ
        </h1>
        <div className="mt-4 text-center text-sm text-neutral-400">
          <WriteEffectText
            text="Minimal answers. Maximum clarity."
            interval={18}
          />
        </div>
        <div className="mx-auto mt-6 h-px w-24 bg-neutral-800/80" />
      </header>

      {/* Accordion */}
      <section>
        {faqs.map((f, i) => (
          <motion.details
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.04, ease: "easeOut" }}
            className="group relative mb-3 overflow-hidden bg-white/[0.02] sm:mb-4"
          >
            {/* left accent bar with glow */}
            <span
              aria-hidden
              className="absolute left-0 top-0 h-full w-[3px] bg-[color:var(--primary)] opacity-70 transition-all duration-300 group-open:w-[6px] group-hover:w-[5px]"
            />

            <summary className="flex cursor-pointer select-none list-none items-center gap-3 px-5 py-4 text-sm font-semibold uppercase tracking-wide transition-colors hover:bg-white/[0.03]">
              {/* animated indicator */}
              <span className="relative grid h-4 w-4 place-items-center">
                <span className="absolute inset-0 rounded-full bg-[color:var(--primary)] opacity-0 blur-sm transition-opacity duration-300 group-open:opacity-50 group-hover:opacity-40" />
                <span className="h-1 w-1 rounded-full bg-neutral-500 transition-all duration-300 group-open:h-2 group-open:w-2 group-open:bg-white" />
              </span>
              <span className="grow">{f.q}</span>
              <svg
                className="h-3.5 w-3.5 -rotate-45 text-neutral-400 transition-transform duration-300 group-open:rotate-0"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </summary>

            <div className="border-primary/10 border-b border-r p-5 py-3 text-sm text-neutral-300 sm:px-5">
              {f.a}
            </div>
          </motion.details>
        ))}
      </section>
    </div>
  );
}
