"use client";

import { api } from "@/convex/_generated/api";
import { Image } from "@imagekit/next";
import { useQuery } from "convex-helpers/react/cache";
import { motion } from "framer-motion";
import { useState } from "react";

export default function GalleryPage() {
  const [active, setActive] = useState<number | null>(null);

  const galleryImages = useQuery(api.admin_temp.listGallery);
  const isLoading = galleryImages === undefined;
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

      {isLoading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {Array.from({ length: 7 }).map((_, idx) => (
            <motion.div
              key={`skeleton-${idx}`}
              className="aspect-square overflow-hidden rounded bg-white/10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.03,
                type: "spring",
                stiffness: 60,
              }}
            >
              <div className="h-full w-full animate-pulse bg-gradient-to-br from-white/5 to-white/10" />
            </motion.div>
          ))}
        </div>
      ) : galleryImages.length === 0 ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <p className="text-white/70">No images in gallery yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {galleryImages.map((image, idx) => {
            const imageSrc = image.imageKitPath
              ? image.imageKitPath
              : image.imageKitId
                ? `/${image.imageKitId}`
                : "";

            return (
              <motion.button
                key={image._id}
                onClick={() => setActive(idx)}
                className="ring-none group relative aspect-square overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  type: "spring",
                  stiffness: 60,
                }}
              >
                <Image
                  src={imageSrc}
                  alt={`Gallery hover ${idx + 1}`}
                  fill
                  className="object-cover object-center opacity-0 invert transition-opacity group-hover:opacity-90"
                  transformation={[
                    {
                      format: "webp",
                      width: 400,
                      height: 400,
                      quality: 90,
                    },
                  ]}
                />
                <Image
                  src={imageSrc}
                  alt={`Gallery ${idx + 1}`}
                  fill
                  className="absolute inset-0 object-cover object-center p-0.5"
                  transformation={[
                    {
                      format: "webp",
                      width: 400,
                      height: 400,
                      quality: 90,
                    },
                  ]}
                />
              </motion.button>
            );
          })}
        </div>
      )}

      {active !== null && galleryImages?.[active] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setActive(null)}
        >
          <div className="relative max-h-full max-w-full overflow-hidden shadow-2xl">
            {(() => {
              const activeImage = galleryImages[active];
              const imageSrc = activeImage.imageKitPath
                ? activeImage.imageKitPath
                : activeImage.imageKitId
                  ? `/${activeImage.imageKitId}`
                  : "";

              return (
                <>
                  <Image
                    src={imageSrc}
                    alt={`Modal hover ${active + 1}`}
                    width={1200}
                    height={800}
                    className="max-h-[90vh] max-w-full object-contain opacity-90 invert transition-opacity"
                    transformation={[
                      {
                        format: "webp",
                        width: 1200,
                        quality: 95,
                      },
                    ]}
                  />
                  <Image
                    src={imageSrc}
                    alt={`Modal ${active + 1}`}
                    width={1200}
                    height={800}
                    className="absolute inset-0 h-full max-h-[90vh] max-w-full object-contain p-2"
                    transformation={[
                      {
                        format: "webp",
                        width: 1200,
                        quality: 95,
                      },
                    ]}
                  />
                </>
              );
            })()}
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
