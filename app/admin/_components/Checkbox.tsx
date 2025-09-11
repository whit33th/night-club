"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { Check, Minus } from "lucide-react";

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  checked?: boolean;
  indeterminate?: boolean;
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { checked = false, indeterminate = false, label, className = "", ...props },
    ref,
  ) => {
    return (
      <label className={`inline-flex cursor-pointer items-center ${className}`}>
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            className="sr-only"
            {...props}
          />
          <div
            className={`flex h-4 w-4 items-center justify-center rounded border-2 transition-all duration-200 ${
              checked || indeterminate
                ? "border-white/80 bg-white text-black"
                : "border-white/30 bg-transparent hover:border-white/50"
            } ${props.disabled ? "cursor-not-allowed opacity-50" : ""} `}
          >
            <div className="flex h-4 w-4 items-center justify-center">
              {checked && !indeterminate && (
                <Check className="h-4 w-3 text-black" strokeWidth={4} />
              )}
              {indeterminate && (
                <Minus className="h-4 w-3 text-black" strokeWidth={4} />
              )}
            </div>
          </div>
        </div>
        {label && (
          <span className="ml-2 select-none text-sm text-white/80">
            {label}
          </span>
        )}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
