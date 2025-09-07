"use client";

import Image from "next/image";
import { X } from "lucide-react";

interface ImagePreviewProps {
  src: string;
  alt: string;
  onRemove?: () => void;
  className?: string;
}

export function ImagePreview({ src, alt, onRemove, className = "" }: ImagePreviewProps) {
  if (!src) return null;

  return (
    <div className={`relative rounded-lg overflow-hidden border border-white/10 bg-white/5 ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-2 right-2 p-1 rounded-full bg-red-500/80 hover:bg-red-500 text-white transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
