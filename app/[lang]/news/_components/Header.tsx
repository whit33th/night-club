"use client";

import WriteEffectText from "@/components/Containers/Effects/WriteEffectText";
import { Dict } from "@/lib/get-dictionary-client";

export function NewsHeader({ dict }: { dict: Dict }) {
  return (
    <header className="relative mb-10 sm:mb-16">
      <h1 className="text-center text-5xl font-black uppercase tracking-tight sm:text-6xl">
        {dict?.news?.title || "News"}
      </h1>
      <div className="mt-4 text-center text-sm text-neutral-400">
        <WriteEffectText
          text={
            dict?.news?.subtitle || "Latest updates, nights and announcements."
          }
          interval={18}
        />
      </div>
      <div className="mx-auto mt-6 h-px w-24 bg-neutral-800/80" />
    </header>
  );
}

export default NewsHeader;
