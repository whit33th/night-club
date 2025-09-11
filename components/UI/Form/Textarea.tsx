"use client";

import { forwardRef, TextareaHTMLAttributes, ReactNode } from "react";
import { FormLabel, FormMessage } from "./FormHelpers";

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
    const textareaClasses = [
      "min-h-[100px] w-full rounded-lg border border-white/15 bg-white/5 text-sm text-white outline-none transition placeholder:text-white/40 focus:ring-2 focus:ring-[var(--primary)]",
      icon ? "py-2 pl-8 pr-3" : "px-3 py-2",
      error ? "border-red-500/60 focus:ring-red-500" : "",
      className,
    ].filter(Boolean).join(" ");

    return (
      <label className="block text-sm">
        <FormLabel 
          label={label} 
          required={required} 
          format={format}
        />
        
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
            className={textareaClasses}
          />
        </div>
        
        <FormMessage error={error} hint={hint} />
      </label>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
