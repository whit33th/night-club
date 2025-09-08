"use client";

import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  loading?: boolean;
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  loading: _loading, // eslint-disable-line @typescript-eslint/no-unused-vars
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed";
  const styles =
    variant === "secondary"
      ? "border border-white/15 bg-white/5 text-white hover:bg-white/10"
      : "bg-[var(--primary)] text-white hover:brightness-110";
  return (
    <button {...props} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}
