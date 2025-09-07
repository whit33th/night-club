"use client";

import React, { ReactNode } from "react";
import Button from "@/components/UI/Form/Button";

interface AdminFormProps {
  children: ReactNode;
  onSubmit: () => void | Promise<void>;
  isLoading?: boolean;
  isSaved?: boolean;
  submitText?: string;
  className?: string;
}

export function AdminForm({
  children,
  onSubmit,
  isLoading = false,
  isSaved = false,
  submitText = "Save",
  className = "grid grid-cols-1 gap-3 md:grid-cols-3",
}: AdminFormProps) {
  return (
    <>
      <div className={className}>{children}</div>
      <Button disabled={isLoading} onClick={onSubmit}>
        {isLoading ? "Saving..." : submitText}
      </Button>
    </>
  );
}
