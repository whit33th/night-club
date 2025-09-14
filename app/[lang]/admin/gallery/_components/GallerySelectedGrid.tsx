"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { memo } from "react";

export type LocalItem = { id: string; file: File; url: string };

type Props = {
  items: LocalItem[];
  disabled?: boolean;
  onRemove: (id: string) => void;
};

function GallerySelectedGridBase({ items, disabled, onRemove }: Props) {
  if (items.length === 0) return null;
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {items.map((it) => (
        <div
          key={it.id}
          className="relative aspect-square overflow-hidden rounded-lg bg-white/5"
        >
          <button
            type="button"
            className="absolute right-1 top-1 z-10 inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/70 hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => onRemove(it.id)}
            aria-label="Remove"
            disabled={disabled}
          >
            <X className="h-4 w-4" />
          </button>
          <Image
            fill
            src={it.url}
            alt="Selected"
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}

const GallerySelectedGrid = memo(GallerySelectedGridBase);
export default GallerySelectedGrid;
