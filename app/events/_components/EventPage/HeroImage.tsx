"use client";

import { Image } from "@imagekit/next";
import { unstable_ViewTransition as ViewTransition } from "react";

type HeroImageProps = {
  id: string;
  imageKitId?: string | null;
  imageKitPath?: string | null;
  convexId?: string | null;
  src?: string; // legacy path or computed path
  alt?: string;
};

export default function HeroImage({
  id,
  imageKitId,
  imageKitPath,
  src,
  alt,
}: HeroImageProps) {
  // Priority: imageKitPath > imageKitId > src fallback
  const imageSrc = imageKitPath
    ? imageKitPath
    : imageKitId
      ? `/${imageKitId}`
      : src || "/imgs/posters/1.jpg";

  return (
    <div className="relative aspect-square h-full w-full overflow-hidden rounded-xl">
      <ViewTransition name={`event-${id}`}>
        <Image
          src={imageSrc}
          alt={alt ?? id}
          fill
          className="object-cover"
          priority
          transformation={[
            {
              format: "webp",
              width: 800,
              height: 800,
              quality: 90,
            },
          ]}
        />
      </ViewTransition>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(260px_180px_at_90%_10%,rgba(0,0,0,0.35),transparent)]" />
    </div>
  );
}
