"use client";

import Image from "next/image";
import { unstable_ViewTransition as ViewTransition } from "react";

type HeroImageProps = {
  id: string;
  src: string;
  alt?: string;
};

export default function HeroImage({ id, src, alt }: HeroImageProps) {
  return (
    <div className="relative aspect-square h-full w-full overflow-hidden rounded-xl">
      <ViewTransition name={`event-${id}`}>
        <Image
          src={src}
          alt={alt ?? id}
          fill
          className="object-cover"
          priority
        />
      </ViewTransition>
    </div>
  );
}
