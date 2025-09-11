"use client";

import { Image, buildSrc } from "@imagekit/next";
import { useState } from "react";

interface ImageWithPlaceholderProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  transformation?: Array<Record<string, string | number>>;
  quality?: number;
  blurQuality?: number;
  blurAmount?: number;
  priority?: boolean;
  loading?: "eager" | "lazy";
  onClick?: () => void;
  sizes?: string;
}

export default function ImageWithPlaceholder({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  transformation = [],
  quality = 90,
  blurQuality = 10,
  blurAmount = 90,
  priority = false,
  loading = "lazy",
  onClick,
  sizes,
}: ImageWithPlaceholderProps) {
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const placeholderStyle = showPlaceholder
    ? {
        backgroundImage: `url(${buildSrc({
          urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT || "",
          src,
          transformation: [
            ...transformation,
            {
              quality: blurQuality,
              blur: blurAmount,
            },
          ],
        })})`,

        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }
    : {};

  const imageProps = {
    src,
    alt,
    className,
    style: placeholderStyle,
    transformation: [
      ...transformation,
      {
        format: "webp",
        quality,
      },
    ],
    onLoad: () => {
      setShowPlaceholder(false);
    },
    onClick,
  };

  if (fill) {
    return (
      <Image
        {...imageProps}
        loading={loading}
        responsive
        priority={priority}
        fill
        sizes={
          sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        }
        alt={alt}
      />
    );
  }

  return (
    <Image
      {...imageProps}
      responsive
      loading={loading}
      priority={priority}
      width={width}
      height={height}
      sizes={sizes}
      alt={alt}
    />
  );
}
