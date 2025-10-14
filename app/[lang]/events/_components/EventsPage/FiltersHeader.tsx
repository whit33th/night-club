"use client";

import { Dict } from "@/lib/get-dictionary-client";
import { motion } from "framer-motion";

type FiltersHeaderProps = {
  title?: string;
  filters: ReadonlyArray<string>;
  active: string;
  onChange: (value: string) => void;
  dict?: Dict;
};

export default function FiltersHeader({
  title,
  filters,
  active,
  onChange,
  dict,
}: FiltersHeaderProps) {
  return (
    <motion.section
      className="relative overflow-hidden rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_400px_at_50%_-50%,color-mix(in_srgb,var(--primary)_25%,transparent),transparent)]" />
      <div className="relative rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur">
        <motion.h1
          className="mb-2 text-center text-4xl font-extrabold tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
          {title || dict?.events?.title || "Upcoming Nights"}
        </motion.h1>

        <motion.ul
          className="mt-2.5 flex flex-wrap items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        >
          {filters.map((f, index) => (
            <motion.li
              key={f}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.3 + index * 0.03,
                ease: "easeOut",
              }}
            >
              <button
                onClick={() => {
                  if (active === f && f !== "All") {
                    onChange("All");
                  } else {
                    onChange(f);
                  }
                }}
                className={`rounded-full border px-3 py-1 text-sm font-semibold transition ${
                  active === f
                    ? "border-[color-mix(in_srgb,var(--primary)_60%,transparent)] bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] text-[var(--primary)]"
                    : "border-white/15 bg-white/5 text-white/80 hover:bg-white/10"
                }`}
              >
                {f.toUpperCase()}
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.section>
  );
}
