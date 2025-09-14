"use client";

import type { Doc } from "@/convex/_generated/dataModel";
import { NewsCard } from "./Card";
import { Locale } from "@/lib/i18n-config";

export function NewsList({
  posts,
  dict,
  locale,
}: {
  posts: Array<Doc<"news">>;

  dict: Dict;
  locale: Locale;
}) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xs uppercase tracking-widest text-neutral-400">
          {dict?.news?.latest || "Latest"}
        </h2>
      </div>
      <div className="columns-2 gap-3 sm:columns-3 sm:gap-4">
        {posts.map((post, index) => (
          <div key={post._id} className="mb-3 break-inside-avoid sm:mb-4">
            <NewsCard post={post} index={index} locale={locale} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default NewsList;
