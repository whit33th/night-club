"use client";

import { use } from "react";
import { NEWS_ITEMS } from "../_components/data";
import NewsDetail from "../_components/Detail";
import BackLink from "../_components/BackLink";

export default function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const post = NEWS_ITEMS.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-sm text-neutral-400">Post not found.</p>
        <BackLink />
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-3xl px-4 pb-16 pt-8 sm:pt-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(520px_220px_at_50%_0%,black,transparent)]"
      >
        <div className="absolute inset-x-0 -top-24 h-64 bg-[radial-gradient(260px_100px_at_50%_0%,color-mix(in_srgb,var(--primary)_18%,transparent),transparent)]" />
      </div>

      <BackLink />
      <NewsDetail post={post} />
    </div>
  );
}
