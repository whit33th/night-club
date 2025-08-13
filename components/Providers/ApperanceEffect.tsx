"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

export default function ApperanceEffect({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = usePathname();
  return (
    <AnimatePresence mode="wait" key={location}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
