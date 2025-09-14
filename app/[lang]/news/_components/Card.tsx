"use client";

import ImageWithPlaceholder from "@/components/UI/ImageKit/ImageWithPlaceholder";
import type { Doc } from "@/convex/_generated/dataModel";
import { Locale } from "@/lib/i18n-config";
import { motion } from "framer-motion";
import Link from "next/link";
import { generateNewsSlug } from "../_utils/slugUtils";
import { formatDate } from "./utils";

export function NewsCard({
  post,
  index,
  locale,
}: {
  post: Doc<"news">;
  index: number;
  locale: Locale;
}) {
  const newsSlug = generateNewsSlug(
    post.title,
    new Date(post._creationTime).toISOString().split("T")[0],
    post._id,
  );

  const formattedDate = formatDate(
    new Date(post._creationTime).toISOString(),
    locale,
  );

  return (
    <Link href={`/news/${newsSlug}`} className="group">
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
        style={{
          clipPath:
            "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)",
        }}
        className="border-x border-b border-white/10"
      >
        <div className="relative overflow-hidden">
          <ImageWithPlaceholder
            src={post.imageKitPath!}
            alt={post.title}
            width={400}
            height={300}
            className="block h-auto w-full scale-[1.01] transform-gpu opacity-95 contrast-125 grayscale transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:opacity-100 group-hover:grayscale-0"
            transformation={[
              {
                width: 400,
              },
            ]}
            quality={80}
            blurQuality={10}
            blurAmount={50}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(400px_160px_at_10%_10%, color-mix(in srgb, var(--primary) 12%, transparent), transparent)",
            }}
          />
        </div>
        <figcaption className="flex items-center justify-between gap-3 border-white/10 bg-white/[0.03] px-3 py-2 text-xs uppercase tracking-wide text-neutral-200">
          <span className="grow select-none text-right text-[0.72rem] text-neutral-200">
            {formattedDate}
            <span className="mx-1 text-neutral-500">{"///"}</span> {post.title}
          </span>
        </figcaption>
      </motion.article>
    </Link>
  );
}

export default NewsCard;
