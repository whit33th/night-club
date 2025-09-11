"use client";

import React, { memo } from "react";
import { FileImage } from "lucide-react";

type Props = {
  inputId?: string;
  imagePreview?: string;
  imageError?: boolean;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearError?: () => void;
};

function ImagePickerBase({
  inputId = "event-poster",
  imagePreview,
  imageError,
  disabled,
  onChange,
  onClearError,
}: Props) {
  return (
    <div className="md:col-span-3">
      <input
        id={inputId}
        type="file"
        accept="image/*"
        onChange={(e) => {
          onChange(e as React.ChangeEvent<HTMLInputElement>);
          onClearError?.();
        }}
        className="sr-only"
        disabled={disabled}
      />
      <label
        htmlFor={inputId}
        className={`group block w-full cursor-pointer rounded-xl border-2 border-dashed bg-white/5 transition-colors ${imageError ? "border-red-500" : "border-white/20 hover:border-white/40"}`}
      >
        <div className="flex min-h-48 items-center justify-center p-4">
          {imagePreview ? (
            <div className="relative aspect-video w-full max-w-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreview}
                alt="Event poster preview"
                className="h-full w-full object-contain"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-white/70">
              <FileImage className="mb-3 h-10 w-10" />
              <span className="text-sm">
                Choose image <span className="text-red-500">*</span>
              </span>
            </div>
          )}
        </div>
      </label>
    </div>
  );
}

const EventImagePicker = memo(ImagePickerBase);
export default EventImagePicker;
