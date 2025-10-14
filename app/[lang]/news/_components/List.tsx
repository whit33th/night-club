"use client";

import type { Doc } from "@/convex/_generated/dataModel";
import { NewsCard } from "./Card";

export function NewsList({ posts }: { posts: Array<Doc<"news">> }) {
  return (
    <section className="columns-2 gap-3 sm:columns-3 sm:gap-4">
      {posts.map((post, index) => (
        <article key={post._id} className="mb-3 break-inside-avoid sm:mb-4">
          <NewsCard post={post} index={index} />
        </article>
      ))}
    </section>
  );
}

export default NewsList;
