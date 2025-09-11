"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import Footer from "../Footer/Footer";
import Sidebar from "./Sidebar";

export const navLinks = [
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/news", label: "News" },
  { href: "/about", label: "About" },
] as const;

export default function Nav({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  return (
    <div className="relative flex min-h-screen flex-col">
      <header
        ref={navRef}
        className="sticky top-0 z-[70] flex w-full items-center justify-between gap-3 bg-black/20 px-3 py-2 backdrop-blur-3xl"
      >
        <Link href="/" className="flex items-center gap-2">
          <Image src="/imgs/logo.png" alt="Logo" width={40} height={40} />
        </Link>
        <nav className="hidden items-center gap-4 text-sm font-semibold md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-white/85 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      <Sidebar open={open} setOpen={setOpen} />

      <main className="relative flex-1 *:p-4">{children}</main>

      <Footer />
    </div>
  );
}
