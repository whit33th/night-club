"use client";

import { ChangeEvent, ReactNode, useRef } from "react";
import { FormLabel, FormError } from "./FormHelpers";

interface FilePickerProps {
  label?: string;
  accept?: string;
  disabled?: boolean;
  onPick: (file: File) => void;
  onPickMany?: (files: File[]) => void;
  multiple?: boolean;
  icon?: ReactNode;
  required?: boolean;
  error?: string;
  className?: string;
}

export default function FilePicker({
  label,
  accept,
  disabled,
  onPick,
  onPickMany,
  multiple,
  icon,
  required,
  error,
  className = "",
}: FilePickerProps) {
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (multiple && files.length) {
      if (onPickMany) onPickMany(files);
      else files.forEach((f) => onPick(f));
    } else {
      const f = files[0];
      if (f) onPick(f);
    }
    if (ref.current) ref.current.value = ""; // allow re-pick same file
  };

  const handleClick = () => ref.current?.click();
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      ref.current?.click();
    }
  };

  const buttonClasses = [
    "inline-flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-white/80 transition hover:bg-white/10",
    disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
    error ? "border-red-500/60 bg-red-500/10" : "border-white/15 bg-white/5",
    className,
  ].join(" ");

  return (
    <div className="text-sm">
      <FormLabel label={label} required={required} />
      
      <div className="relative">
        <input
          ref={ref}
          type="file"
          accept={accept}
          disabled={disabled}
          multiple={multiple}
          onChange={handleChange}
          required={required}
          className="hidden"
        />
        
        <div
          role="button"
          tabIndex={0}
          aria-label={multiple ? "Choose files" : "Choose file"}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={buttonClasses}
        >
          {icon && <span className="text-white/50">{icon}</span>}
          <span>{multiple ? "Choose files" : "Choose file"}</span>
        </div>
      </div>
      
      <FormError error={error} />
    </div>
  );
}
