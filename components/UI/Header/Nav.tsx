"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { useSidebar } from "./_hooks";

export const navLinks = [
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/news", label: "News" },
  { href: "/about", label: "About" },
] as const;

export default function Nav() {
  const [open, setOpen] = useState(false);

  useSidebar({ open, setOpen });
  return (
    <header
      className={`${
        open
          ? "fixed inset-0 z-50 bg-black/90 backdrop-blur-3xl"
          : "sticky left-0 top-0 z-50 bg-black/20 backdrop-blur-3xl"
      } w-full transition-all duration-300`}
    >
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between gap-3 px-3 py-2">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/imgs/logo.png" alt="Logo" width={40} height={40} />
        </Link>
        <ul className="hidden items-center gap-4 text-sm font-semibold md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-white/85 hover:text-white">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <Sidebar open={open} setOpen={setOpen} />
    </header>
  );
}
