"use client";

import { ReactNode } from "react";
import Button from "@/components/UI/Form/Button";

interface AdminFormLayoutProps {
  title: string;
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  submitText: string;
  isLoading: boolean;
  editingBanner?: ReactNode;
  dataSection?: ReactNode;
}

export default function AdminFormLayout({
  title,
  children,
  onSubmit,
  submitText,
  isLoading,
  editingBanner,
  dataSection,
}: AdminFormLayoutProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      
      {editingBanner}

      <form onSubmit={onSubmit} className="space-y-6">
        {children}
        <Button type="submit" loading={isLoading}>
          {submitText}
        </Button>
      </form>

      {dataSection}
    </div>
  );
}
