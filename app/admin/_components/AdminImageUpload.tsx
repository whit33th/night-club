"use client";

import { FileImage } from "lucide-react";
import Image from "next/image";

interface AdminImageUploadProps {
  id: string;
  label?: string;
  imagePreview?: string;
  imageError?: boolean;
  disabled?: boolean;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onErrorClear?: () => void;
  className?: string;
}

export default function AdminImageUpload({
  id,
  label = "Image",
  imagePreview,
  imageError = false,
  disabled = false,
  required = false,
  onChange,
  onErrorClear,
  className = "",
}: AdminImageUploadProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    onErrorClear?.();
  };

  return (
    <div className={className}>
      {label && (
        <label className="mb-2 block text-sm font-medium text-white/90">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      
      <input
        id={id}
        type="file"
        accept="image/*"
        onChange={handleChange}
        disabled={disabled}
        className="sr-only"
      />
      
      <label
        htmlFor={id}
        className={`group block w-full cursor-pointer rounded-xl border-2 border-dashed bg-white/5 transition-colors ${
          imageError ? "border-red-500" : "border-white/20 hover:border-white/40"
        } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
      >
        <div className="flex min-h-48 items-center justify-center p-4">
          {imagePreview ? (
            <div className="relative aspect-video w-full max-w-xl">
              <Image
                src={imagePreview}
                alt="Preview"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-white/70">
              <FileImage className="mb-3 h-10 w-10" />
              <span className="text-sm">
                Choose {label.toLowerCase()}
                {required && <span className="text-red-500"> *</span>}
              </span>
            </div>
          )}
        </div>
      </label>
      
      {imageError && (
        <p className="mt-2 text-sm text-red-400">
          {label} is required
        </p>
      )}
    </div>
  );
}
