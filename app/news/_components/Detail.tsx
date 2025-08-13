"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { NewsItem } from "./data";
import { formatDate } from "./utils";

export function NewsDetail({ post }: { post: NewsItem }) {
  return (
    <div>
      <header className="mb-8 sm:mb-12">
        <h1 className="mt-3 text-3xl font-black uppercase tracking-tight sm:text-4xl">
          {formatDate(post.date)}
          <span className="mx-2 text-neutral-500">{"///"}</span>
          <span className="text-neutral-500">{post.title}</span>
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
            width={400}
            height={400}
            src={post.img}
            alt={post.title}
            className="block w-full transform-gpu transition-all duration-700 ease-out hover:grayscale-0"
          />
        </div>
        <div className="border-l-8 border-white/10 px-4 py-4 sm:px-5 sm:py-5">
          <p className="text-lg font-semibold leading-relaxed text-neutral-300">
            {post.body}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default NewsDetail;
