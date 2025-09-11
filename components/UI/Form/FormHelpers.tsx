"use client";

import { ReactNode } from "react";

interface FormLabelProps {
  label?: string;
  required?: boolean;
  format?: string;
  error?: string;
  hint?: string;
  className?: string;
  children?: ReactNode;
}

export function FormLabel({
  label,
  required,
  format,
  className = "",
}: Omit<FormLabelProps, "error" | "hint" | "children">) {
  if (!label) return null;

  return (
    <div className={`mb-1 flex items-center justify-between ${className}`}>
      <span className="block text-xs font-medium uppercase tracking-wide text-white/70">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </span>
      {format && (
        <span className="text-[10px] uppercase tracking-wide text-white/40">
          {format}
        </span>
      )}
    </div>
  );
}

export function FormError({ error }: { error?: string }) {
  if (!error) return null;
  return <span className="mt-1 block text-xs text-red-400">{error}</span>;
}

export function FormHint({ hint }: { hint?: string }) {
  if (!hint) return null;
  return <span className="mt-1 block text-xs text-white/50">{hint}</span>;
}

export function FormMessage({ error, hint }: { error?: string; hint?: string }) {
  if (error) return <FormError error={error} />;
  if (hint) return <FormHint hint={hint} />;
  return null;
}
