"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const images = ["/imgs/1.jpg", "/imgs/2.jpg", "/imgs/3.jpg", "/imgs/4.jpg"];

export default function GalleryPage() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="flex flex-col gap-6">
      <section className="relative w-full overflow-hidden rounded-xl">
        <PixelOverlay />
        <video
          src="/videos/2.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          style={{
            imageRendering: "pixelated",
            filter: "contrast(1.1) saturate(1.2)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="relative z-10 grid min-h-[40vh] w-full place-items-center p-3 sm:min-h-[50vh] sm:p-6">
          <div className="mx-auto w-full max-w-full text-center text-white">
            <h2 className="mx-auto inline-block w-full max-w-xs text-3xl font-extrabold uppercase tracking-tight sm:max-w-none sm:text-5xl">
              After Dark Moments
            </h2>
            {/* <p className="mx-auto mt-3 w-full max-w-2xl text-sm text-white/80 sm:text-base">
              Nights out, cool lights, good vibes. Just moments we liked.
            </p> */}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
        {images.map((src, idx) => (
          <motion.button
            key={idx}
            onClick={() => setActive(idx)}
            className="ring-none group relative aspect-square overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: idx * 0.08,
              type: "spring",
              stiffness: 60,
            }}
          >
            <Image
              src={src}
              alt={`Gallery hover ${idx + 1}`}
              fill
              className="object-cover object-center opacity-0 invert transition-opacity group-hover:opacity-90"
            />
            <Image
              src={src}
              alt={`Gallery ${idx + 1}`}
              fill
              className="object-cover object-center p-0.5"
            />
          </motion.button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4"
          onClick={() => setActive(null)}
        >
          <div className="relative h-full w-full max-w-5xl overflow-hidden rounded-xl shadow-2xl">
            <Image
              src={images[active]}
              alt={`Modal ${active + 1}`}
              fill
              className="object-contain invert"
            />
            <Image
              src={images[active]}
              alt={`Modal ${active + 1}`}
              fill
              className="object-contain p-2 xl:p-3"
            />
          </div>
        </div>
      )}
    </div>
  );

  function PixelOverlay() {
    return (
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0 h-full w-full"
        style={{ mixBlendMode: "soft-light", opacity: 1 }}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <filter id="pixelate" x="0" y="0">
          {/* 2x bigger than previous (was 16, now 16) */}
          <feFlood x="16" y="16" height="16" width="16" />
          <feTile result="a" />
          <feComposite in="SourceGraphic" in2="a" operator="in" />
        </filter>
        <rect width="100%" height="100%" filter="url(#pixelate)" fill="#fff" />
        {/* Scanlines */}
        <pattern
          id="scanlines"
          width="100%"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <rect y="0" width="100%" height="16" fill="black" opacity="0.12" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#scanlines)" />
      </svg>
    );
  }
}
