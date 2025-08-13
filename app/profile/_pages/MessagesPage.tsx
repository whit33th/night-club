"use client";

import { UserCircle2 } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="col-span-full flex min-h-64 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-8 text-white/70">
      <div className="flex items-center gap-2">
        <UserCircle2 className="h-5 w-5" />
        <span>Messages section (inline Activity) — coming soon</span>
      </div>
    </div>
  );
}
