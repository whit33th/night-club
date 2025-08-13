"use client";

import type { NewsItem } from "./data";
import { NewsCard } from "./Card";

export function NewsList({ posts }: { posts: Array<NewsItem> }) {
  return (
    <section className="mb-10 sm:mb-16">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xs uppercase tracking-widest text-neutral-400">
          Latest
        </h2>
      </div>
      <div className="columns-2 gap-3 sm:columns-3 sm:gap-4">
        {posts.map((post, index) => (
          <NewsCard key={post.id} post={post} index={index} />
        ))}
      </div>
    </section>
  );
}

export default NewsList;
