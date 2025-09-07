"use client";

import { forwardRef, InputHTMLAttributes, ReactNode } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
  format?: string;
  icon?: ReactNode;
};

const Input = forwardRef<HTMLInputElement, Props>(
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
            <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-white/50">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            required={required}
            {...props}
            className={
              "w-full rounded-lg border border-white/15 bg-white/5 py-2 text-sm text-white outline-none transition placeholder:text-white/40 focus:ring-2 focus:ring-[var(--primary)] " +
              (icon ? "pl-8 pr-3" : "px-3") +
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

Input.displayName = "Input";

export default Input;
