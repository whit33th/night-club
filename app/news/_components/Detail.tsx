"use client";

import { motion } from "framer-motion";
import { Image } from "@imagekit/next";
import type { Doc } from "@/convex/_generated/dataModel";
import { formatDate } from "./utils";

export function NewsDetail({ news }: { news: Doc<"news"> }) {
  // Use ImageKit image path
  const imageSrc = news.imageKitPath
    ? news.imageKitPath
    : news.imageKitId
      ? `/${news.imageKitId}`
      : "/imgs/1.jpg";

  // Format date from timestamp
  const formattedDate = formatDate(new Date(news._creationTime).toISOString());

  return (
    <div>
      <header className="mb-8 sm:mb-12">
        <h1 className="mt-3 text-3xl font-black uppercase tracking-tight sm:text-4xl">
          {formattedDate}
          <span className="mx-2 text-neutral-500">{"///"}</span>
          <span className="text-neutral-500">{news.title}</span>
        </h1>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="overflow-hidden"
      >
        <div className="relative">
          <Image
            src={imageSrc}
            alt={news.title}
            width={800}
            height={600}
            className="block w-full transform-gpu transition-all duration-700 ease-out hover:grayscale-0"
            transformation={[
              {
                width: 800,
                height: 600,
                quality: 90,
              },
            ]}
          />
        </div>
        <div className="border-l-8 border-white/10 px-4 py-4 sm:px-5 sm:py-5">
          <p className="text-lg font-semibold leading-relaxed text-neutral-300">
            {news.body}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default NewsDetail;
