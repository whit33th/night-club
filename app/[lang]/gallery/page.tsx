"use client";

import ImageWithPlaceholder from "@/components/UI/ImageKit/ImageWithPlaceholder";
import { api } from "@/convex/_generated/api";
import { getDictionaryClient } from "@/lib/get-dictionary-client";
import { Locale } from "@/lib/i18n-config";
import { useQuery } from "convex-helpers/react/cache";
import { motion } from "framer-motion";
import Image from "next/image";
import { use, useState } from "react";

type Props = { params: Promise<{ lang: Locale }> };

export default function GalleryPage({ params }: Props) {
  const { lang } = use(params);
  const dict = getDictionaryClient(lang);
  const [active, setActive] = useState<number | null>(null);

  const galleryImages = useQuery(api.admin.listGallery);
  const isLoading = galleryImages === undefined;
  return (
    <div className="flex flex-col gap-6">
      <motion.div
        className="relative flex min-h-[40dvh] items-center justify-center overflow-hidden rounded-xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Image
          src="/imgs/backgrounds/gallery.webp"
          alt="Gallery"
          width={256}
          height={256}
          className="absolute inset-0 -z-10 h-full w-full object-cover blur-xl"
          priority
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black to-transparent" />
        <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-4xl font-extrabold uppercase tracking-tight">
            {dict.gallery.title}
          </h1>
          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/80">
            {dict.gallery.subtitle}
          </p>
        </div>
      </motion.div>

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
          <p className="text-white/70">{dict.gallery.noImages}</p>
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
                <ImageWithPlaceholder
                  src={imageSrc}
                  alt={`Gallery ${idx + 1}`}
                  fill
                  className="object-cover object-center"
                  transformation={[
                    {
                      width: 400,
                      height: 400,
                    },
                  ]}
                  quality={90}
                  blurQuality={10}
                  blurAmount={50}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1536px) 25vw, 20vw"
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
                <ImageWithPlaceholder
                  src={imageSrc}
                  alt={`Modal ${active + 1}`}
                  width={1200}
                  height={800}
                  className="max-h-[90vh] max-w-full object-contain"
                  transformation={[
                    {
                      width: 1200,
                    },
                  ]}
                  quality={95}
                  blurQuality={5}
                  blurAmount={30}
                  sizes="90vw"
                />
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
