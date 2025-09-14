"use client";

import { use } from "react";
import { useQuery } from "convex-helpers/react/cache";
import { api } from "@/convex/_generated/api";
import { extractNewsIdFromSlug } from "../_utils/slugUtils";
import NewsDetail from "../_components/Detail";
import BackLink from "../_components/BackLink";
import { Id } from "@/convex/_generated/dataModel";
import { Locale } from "@/lib/i18n-config";
import { getDictionaryClient } from "@/lib/get-dictionary-client";

export default function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string; lang: Locale }>;
}) {
  const { slug, lang } = use(params);
  const dict = getDictionaryClient(lang);

  const newsId = extractNewsIdFromSlug(slug);

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
        <BackLink dict={dict} />
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
        <BackLink dict={dict} />
        <div className="mt-8">
          <h1 className="text-2xl font-bold text-white">
            {dict.news.notFound}
          </h1>
          <p className="mt-2 text-neutral-400">
            {dict.news.notFoundDescription}
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

      <BackLink dict={dict} />
      <NewsDetail news={news} locale={lang} />
    </div>
  );
}
