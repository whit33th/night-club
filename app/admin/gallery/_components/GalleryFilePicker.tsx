"use client";

import React, { memo } from "react";
import { ImagePlusIcon } from "lucide-react";

type Props = {
  inputId?: string;
  disabled?: boolean;
  imageError?: boolean;
  onFiles: (files: FileList | null) => void;
};

function GalleryFilePickerBase({
  inputId = "gallery-image",
  disabled,
  imageError,
  onFiles,
}: Props) {
  return (
    <div className="md:col-span-3">
      <input
        id={inputId}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp,image/gif,image/bmp,image/tiff,image/svg+xml"
        multiple
        onChange={(e) => {
          const input = e.target as HTMLInputElement;
          onFiles(input.files);
          try {
            input.value = "";
          } catch {}
        }}
        className="sr-only"
        disabled={disabled}
      />
      <label
        htmlFor={inputId}
        className={`group block w-full cursor-pointer rounded-xl border-2 border-dashed bg-white/5 transition-colors ${imageError ? "border-red-500" : "border-white/20 hover:border-white/40"}`}
      >
        <div className="flex min-h-48 items-center justify-center p-4">
          <div className="flex flex-col items-center justify-center py-10 text-white/70">
            <ImagePlusIcon className="mb-3 h-10 w-10" />
            <span className="text-sm">
              Choose images <span className="text-red-500">*</span>
            </span>
          </div>
        </div>
      </label>
    </div>
  );
}

const GalleryFilePicker = memo(GalleryFilePickerBase);
export default GalleryFilePicker;
