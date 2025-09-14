"use client";

import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import ImageWithPlaceholder from "@/components/UI/ImageKit/ImageWithPlaceholder";

export function HoverPreviewIcon({
  imageKitId,
  imageKitPath,
}: {
  imageKitId?: string | null;
  imageKitPath?: string | null;
  size?: number;
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const hasValidImage = !!imageKitPath;

  return (
    <div
      className={`inline-flex ${hasValidImage ? "cursor-pointer" : "cursor-not-allowed"}`}
      onMouseEnter={() => hasValidImage && setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onMouseMove={(e) =>
        hasValidImage && setPos({ x: e.clientX, y: e.clientY })
      }
    >
      <ImageIcon
        className={hasValidImage ? "text-white/70" : "text-red-500"}
        size={18}
      />
      {open && hasValidImage && (
        <PreviewAtCursor
          x={pos.x}
          y={pos.y - 8}
          imageKitId={imageKitId}
          imageKitPath={imageKitPath}
          size={300}
        />
      )}
    </div>
  );
}

function PreviewAtCursor({
  x,
  y,
  imageKitId,
  imageKitPath,
  size,
}: {
  x: number;
  y: number;
  imageKitId?: string | null;
  imageKitPath?: string | null;
  size: number;
}) {
  if (!imageKitId && !imageKitPath) {
    return (
      <div
        className="fixed z-50 -translate-x-1/2 -translate-y-full"
        style={{ left: x, top: y }}
      >
        <div className="pointer-events-none rounded-md border border-white/10 bg-black/80 p-1 shadow-lg backdrop-blur">
          <div
            className="animate-pulse rounded bg-white/10"
            style={{ width: size, height: size }}
          />
        </div>
      </div>
    );
  }

  const imageSrc = imageKitPath
    ? imageKitPath
    : imageKitId
      ? `/${imageKitId}`
      : "";

  return (
    <div
      className="fixed z-50 -translate-x-1/2 -translate-y-full"
      style={{ left: x, top: y }}
    >
      <div className="pointer-events-none rounded-md border border-white/10 bg-black/80 p-1 shadow-lg backdrop-blur">
        <div className="relative" style={{ width: 300, height: 300 }}>
          <ImageWithPlaceholder
            src={imageSrc}
            alt="preview"
            fill
            className="rounded object-contain"
            transformation={[
              {
                width: 300,
              },
            ]}
            quality={80}
            blurQuality={10}
            blurAmount={50}
            sizes="300px"
          />
        </div>
      </div>
    </div>
  );
}
