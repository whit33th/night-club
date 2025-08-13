"use client";

import NewsHeader from "./_components/Header";
import NewsList from "./_components/List";
import { NEWS_ITEMS } from "./_components/data";

export default function NewsPage() {
  return (
    <div className="relative mx-auto max-w-3xl px-4 pb-16 pt-8 sm:pt-14">
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-0 -z-10 select-none opacity-[0.03]"
      />
      <NewsHeader />
      <NewsList posts={NEWS_ITEMS} />
    </div>
  );
}
