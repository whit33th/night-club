"use client";

import { ChangeEvent, ReactNode, useRef } from "react";

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
}: {
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
}) {
  const ref = useRef<HTMLInputElement>(null);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (multiple && files.length) {
      if (onPickMany) onPickMany(files);
      else files.forEach((f) => onPick(f));
    } else {
      const f = files[0];
      if (f) onPick(f);
    }
    if (ref.current) ref.current.value = ""; // allow re-pick same file
  }

  return (
    <div className="text-sm">
      {label && (
        <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-white/70">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </span>
      )}
      <div className="relative">
        <input
          ref={ref}
          type="file"
          accept={accept}
          disabled={disabled}
          multiple={multiple}
          onChange={onChange}
          required={required}
          className="hidden"
        />
        <div
          role="button"
          tabIndex={0}
          aria-label={multiple ? "Choose files" : "Choose file"}
          onClick={() => ref.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              ref.current?.click();
            }
          }}
          className={
            "inline-flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-white/80 transition hover:bg-white/10 " +
            (disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer") +
            (error
              ? " border-red-500/60 bg-red-500/10"
              : " border-white/15 bg-white/5") +
            " " +
            className
          }
        >
          {icon && <span className="text-white/50">{icon}</span>}
          <span className="">{multiple ? "Choose files" : "Choose file"}</span>
        </div>
      </div>
      {error && (
        <span className="mt-1 block text-xs text-red-400">{error}</span>
      )}
    </div>
  );
}
