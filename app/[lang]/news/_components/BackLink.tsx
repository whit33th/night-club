"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Dict } from "@/lib/get-dictionary-client";

export function BackLink({ dict }: { dict: Dict  }) {
  return (
    <Link
      href="/news"
      className="hover:text-primary group inline-flex items-center gap-1 text-xs uppercase text-neutral-400 underline-offset-4 transition-colors hover:underline"
    >
      <ArrowLeft className="h-4 w-4" />
      {dict?.news?.back || "Back"}
    </Link>
  );
}

export default BackLink;
