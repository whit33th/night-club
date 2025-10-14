"use client";

import ImageWithPlaceholder from "@/components/UI/ImageKit/ImageWithPlaceholder";
import type { Doc } from "@/convex/_generated/dataModel";
import { Locale } from "@/lib/i18n-config";
import { formatTextWithLinks } from "@/lib/text-utils";
import { motion } from "framer-motion";
import { formatDate } from "./utils";

export function NewsDetail({
  news,
  locale,
}: {
  news: Doc<"news">;
  locale: Locale;
}) {
  // Use ImageKit image path
  const imageSrc = news.imageKitPath
    ? news.imageKitPath
    : news.imageKitId
      ? `/${news.imageKitId}`
      : "/imgs/1.jpg";

  // Format date from timestamp
  const formattedDate = formatDate(
    new Date(news._creationTime).toISOString(),
    locale,
  );

  return (
    <div>
      <header className="mb-8">
        <h1 className="mt-3 text-3xl font-black uppercase tracking-tight sm:text-4xl">
          {formattedDate}
          <span className="mx-2 text-neutral-500">{"///"}</span>
          <span className="text-neutral-500">{news.title}</span>
        </h1>
      </header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="overflow-hidden"
      >
        <div className="relative overflow-hidden">
          <ImageWithPlaceholder
            src={imageSrc}
            alt={news.title}
            width={800}
            height={400}
            className="block h-auto w-full transform-gpu object-cover transition-all duration-700 ease-out hover:grayscale-0 sm:max-h-[400px] md:max-h-[500px] lg:max-h-[600px] xl:max-h-[700px]"
            quality={75}
            blurQuality={5}
            blurAmount={30}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 95vw, (max-width: 1024px) 90vw, (max-width: 1280px) 85vw, 700px"
          />
        </div>
        <div className="border-l-8 border-white/10 px-4 py-4 sm:px-5 sm:py-5">
          <div className="text-lg font-semibold leading-relaxed text-neutral-300">
            {formatTextWithLinks(news.body)}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default NewsDetail;
