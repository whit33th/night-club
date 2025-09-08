"use client";

import { use } from "react";
import { useQuery } from "convex-helpers/react/cache";
import { api } from "@/convex/_generated/api";
import { extractNewsIdFromSlug } from "../_utils/slugUtils";
import NewsDetail from "../_components/Detail";
import BackLink from "../_components/BackLink";
import { Id } from "@/convex/_generated/dataModel";

export default function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  // Extract news ID from slug (last part after last hyphen)
  const newsId = extractNewsIdFromSlug(slug);

  // Get news item from Convex
  const news = useQuery(api.admin.getNews, { id: newsId as Id<"news"> });

  if (news === undefined) {
    return (
      <div className="relative mx-auto max-w-3xl px-4 pt-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(520px_220px_at_50%_0%,black,transparent)]"
        >
          <div className="absolute inset-x-0 -top-24 h-64 bg-[radial-gradient(260px_100px_at_50%_0%,color-mix(in_srgb,var(--primary)_18%,transparent),transparent)]" />
        </div>
        <BackLink />
        <div className="mt-8 animate-pulse">
          <div className="mb-4 h-8 rounded bg-neutral-800" />
          <div className="mb-4 h-64 rounded bg-neutral-800" />
          <div className="space-y-2">
            <div className="h-4 rounded bg-neutral-800" />
            <div className="h-4 w-4/5 rounded bg-neutral-800" />
            <div className="h-4 w-3/5 rounded bg-neutral-800" />
          </div>
        </div>
      </div>
    );
  }

  if (news === null) {
    return (
      <div className="relative mx-auto max-w-3xl px-4 pt-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(520px_220px_at_50%_0%,black,transparent)]"
        >
          <div className="absolute inset-x-0 -top-24 h-64 bg-[radial-gradient(260px_100px_at_50%_0%,color-mix(in_srgb,var(--primary)_18%,transparent),transparent)]" />
        </div>
        <BackLink />
        <div className="mt-8">
          <h1 className="text-2xl font-bold text-white">News not found</h1>
          <p className="mt-2 text-neutral-400">
            The requested news item could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-3xl px-4 pt-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(520px_220px_at_50%_0%,black,transparent)]"
      >
        <div className="absolute inset-x-0 -top-24 h-64 bg-[radial-gradient(260px_100px_at_50%_0%,color-mix(in_srgb,var(--primary)_18%,transparent),transparent)]" />
      </div>

      <BackLink />
      <NewsDetail news={news} />
    </div>
  );
}
