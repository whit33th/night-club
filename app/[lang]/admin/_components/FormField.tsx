"use client";

import Input from "@/components/UI/Form/Input";
import Textarea from "@/components/UI/Form/Textarea";
import { forwardRef } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

type FormFieldError =
  | FieldError
  | Merge<FieldError, FieldErrorsImpl<Record<string, unknown>>>
  | undefined;

interface FormFieldProps {
  label?: string;
  type?: "text" | "email" | "number" | "date" | "time" | "textarea" | "file";
  error?: FormFieldError;
  icon?: React.ReactNode;
  placeholder?: string;
  accept?: string;
  required?: boolean;
  className?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  value?: string | number;
  name?: string;
}

export const FormField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormFieldProps
>(
  (
    {
      label,
      type = "text",
      error,
      icon,
      placeholder,
      accept,
      required,
      className = "",
      onChange,
      ...props
    },
    ref,
  ) => {
    const hasError = !!error;
    const errorMessage: string =
      typeof error === "string" ? error : (error?.message as string) || "";
    const errorClassName = hasError ? "!border-red-500/60 !bg-red-500/10" : "";

    if (type === "textarea") {
      return (
        <div className={`space-y-1 ${className}`}>
          <Textarea
            ref={ref as React.RefObject<HTMLTextAreaElement>}
            label={label}
            icon={icon}
            required={required}
            placeholder={placeholder}
            className={errorClassName}
            onChange={onChange}
            {...props}
          />
          {hasError && <p className="text-sm text-red-400">{errorMessage}</p>}
        </div>
      );
    }

    if (type === "file") {
      return (
        <div className={`space-y-1 ${className}`}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/90">
              {icon && <span className="mr-2">{icon}</span>}
              {label}
              {required && <span className="ml-1 text-red-400">*</span>}
            </label>
            <input
              ref={ref as React.RefObject<HTMLInputElement>}
              type="file"
              accept={accept}
              required={required}
              onChange={onChange}
              className={`block w-full text-sm text-white/70 transition-colors file:mr-4 file:rounded-lg file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-white/20 ${errorClassName}`}
              {...props}
            />
          </div>
          {hasError && <p className="text-sm text-red-400">{errorMessage}</p>}
        </div>
      );
    }

    return (
      <div className={`space-y-1 ${className}`}>
        <Input
          ref={ref as React.RefObject<HTMLInputElement>}
          type={type}
          label={label}
          icon={icon}
          required={required}
          placeholder={placeholder}
          className={errorClassName}
          onChange={onChange}
          {...props}
        />
        {hasError && <p className="text-sm text-red-400">{errorMessage}</p>}
      </div>
    );
  },
);

FormField.displayName = "FormField";
