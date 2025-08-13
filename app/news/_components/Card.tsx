"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { NewsItem } from "./data";
import { formatDate } from "./utils";

export function NewsCard({ post, index }: { post: NewsItem; index: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
      className="group relative mb-3 overflow-hidden border-x border-b border-white/10 [break-inside:avoid] sm:mb-4"
      style={{
        clipPath:
          "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)",
        position: "relative",
      }}
    >
      <Link href={`/news/${post.id}`} className="block no-underline">
        <div className="relative overflow-hidden">
          <Image
            width={200}
            height={200}
            src={post.img}
            alt={post.title}
            className="block w-full scale-[1.01] transform-gpu opacity-95 contrast-125 grayscale transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:opacity-100 group-hover:grayscale-0"
            loading="lazy"
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
            {formatDate(post.date)}
            <span className="mx-1 text-neutral-500">{"///"}</span> {post.title}
          </span>
        </figcaption>
      </Link>
    </motion.figure>
  );
}

export default NewsCard;
