"use client";

import { useQuery } from "convex-helpers/react/cache";
import { api } from "@/convex/_generated/api";
import NewsHeader from "./_components/Header";
import NewsList from "./_components/List";

export default function NewsPage() {
  const news = useQuery(api.admin.listNews);

  return (
    <div className="relative mx-auto max-w-3xl px-4 pt-8">
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-0 -z-10 select-none opacity-[0.03]"
      />
      <NewsHeader />
      {news === undefined ? (
        <div className="mt-8 flex items-center justify-center gap-3 py-12">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white/60"></div>
        </div>
      ) : (
        <NewsList posts={news} />
      )}
    </div>
  );
}
