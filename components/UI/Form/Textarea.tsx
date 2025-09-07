"use client";

import { forwardRef, TextareaHTMLAttributes, ReactNode } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  hint?: string;
  format?: string;
  icon?: ReactNode;
};

const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  (
    { label, error, hint, format, icon, className = "", required, ...props },
    ref,
  ) => {
    return (
      <label className="block text-sm">
        {label && (
          <div className="mb-1 flex items-center justify-between">
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
        )}
        <div className="relative">
          {icon && (
            <span className="pointer-events-none absolute left-2 top-3 text-white/50">
              {icon}
            </span>
          )}
          <textarea
            ref={ref}
            required={required}
            {...props}
            className={
              "min-h-[100px] w-full rounded-lg border border-white/15 bg-white/5 text-sm text-white outline-none transition placeholder:text-white/40 focus:ring-2 focus:ring-[var(--primary)] " +
              (icon ? "py-2 pl-8 pr-3" : "px-3 py-2") +
              (error ? "border-red-500/60 focus:ring-red-500" : "") +
              className
            }
          />
        </div>
        {error ? (
          <span className="mt-1 block text-xs text-red-400">{error}</span>
        ) : hint ? (
          <span className="mt-1 block text-xs text-white/50">{hint}</span>
        ) : null}
      </label>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
