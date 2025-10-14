"use client";

import { api } from "@/convex/_generated/api";
import { getDictionaryClient } from "@/lib/get-dictionary-client";
import { Locale } from "@/lib/i18n-config";
import { useQuery } from "convex-helpers/react/cache";
import { use } from "react";
import NewsHeader from "./_components/Header";
import NewsList from "./_components/List";

type Props = { params: Promise<{ lang: Locale }> };

export default function NewsPage({ params }: Props) {
  const { lang } = use(params);
  const dict = getDictionaryClient(lang);

  const news = useQuery(api.admin.listNews);

  return (
    <div className="relative mx-auto max-w-3xl px-4 pt-8 2xl:max-w-4xl">
      <NewsHeader dict={dict} />
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
