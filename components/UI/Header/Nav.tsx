"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { useSidebar } from "./_hooks";
import { useLanguage } from "@/components/Providers/LanguageProvider";
import { useLocalizedLink } from "@/components/Providers/useLocalizedLink";
import LocaleSwitcher from "../LocaleSwitcher";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { lang, dict } = useLanguage();
  const localizedLink = useLocalizedLink();

  const navLinks = [
    { href: localizedLink("events"), label: dict.navigation.events },
    { href: localizedLink("gallery"), label: dict.navigation.gallery },
    { href: localizedLink("news"), label: dict.navigation.news },
    { href: localizedLink("about"), label: dict.navigation.about },
  ];

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
        <Link href={localizedLink("")} className="flex items-center gap-2">
          <Image
            src="/imgs/logo.png"
            alt="Logo"
            width={40}
            height={40}
            priority
          />
        </Link>
        <div className="flex items-center gap-4">
          <ul className="hidden items-center gap-4 text-sm font-semibold md:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/85 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <LocaleSwitcher currentLocale={lang} />
          <button
            aria-label={
              open
                ? dict.common?.close || "Close menu"
                : dict.common?.open || "Open menu"
            }
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <Sidebar open={open} setOpen={setOpen} navLinks={navLinks} />
    </header>
  );
}
