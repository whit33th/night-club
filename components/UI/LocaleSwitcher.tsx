"use client";

import { i18n, type Locale } from "@/lib/i18n-config";
import { Languages } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// SVG Flag Components
const USFlag = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 16" fill="none">
    <rect width="24" height="16" fill="#B22234" />
    <rect width="24" height="1.23" y="1.23" fill="white" />
    <rect width="24" height="1.23" y="3.69" fill="white" />
    <rect width="24" height="1.23" y="6.15" fill="white" />
    <rect width="24" height="1.23" y="8.62" fill="white" />
    <rect width="24" height="1.23" y="11.08" fill="white" />
    <rect width="24" height="1.23" y="13.54" fill="white" />
    <rect width="9.6" height="8.62" fill="#3C3B6E" />
    <g fill="white">
      <circle cx="1.6" cy="1.6" r="0.3" />
      <circle cx="3.2" cy="1.6" r="0.3" />
      <circle cx="4.8" cy="1.6" r="0.3" />
      <circle cx="6.4" cy="1.6" r="0.3" />
      <circle cx="8" cy="1.6" r="0.3" />
      <circle cx="2.4" cy="2.8" r="0.3" />
      <circle cx="4" cy="2.8" r="0.3" />
      <circle cx="5.6" cy="2.8" r="0.3" />
      <circle cx="7.2" cy="2.8" r="0.3" />
      <circle cx="1.6" cy="4" r="0.3" />
      <circle cx="3.2" cy="4" r="0.3" />
      <circle cx="4.8" cy="4" r="0.3" />
      <circle cx="6.4" cy="4" r="0.3" />
      <circle cx="8" cy="4" r="0.3" />
      <circle cx="2.4" cy="5.2" r="0.3" />
      <circle cx="4" cy="5.2" r="0.3" />
      <circle cx="5.6" cy="5.2" r="0.3" />
      <circle cx="7.2" cy="5.2" r="0.3" />
      <circle cx="1.6" cy="6.4" r="0.3" />
      <circle cx="3.2" cy="6.4" r="0.3" />
      <circle cx="4.8" cy="6.4" r="0.3" />
      <circle cx="6.4" cy="6.4" r="0.3" />
      <circle cx="8" cy="6.4" r="0.3" />
    </g>
  </svg>
);

const PolandFlag = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 16" fill="none">
    <rect width="24" height="8" fill="white" />
    <rect width="24" height="8" y="8" fill="#DC143C" />
  </svg>
);

const localeInfo = {
  en: { name: "English", flag: USFlag },
  pl: { name: "Polski", flag: PolandFlag },
} as const;

export default function LocaleSwitcher({
  currentLocale,
}: {
  currentLocale: Locale;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathName = usePathname();

  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-black/20 text-white/70 transition-all hover:border-white/10 hover:bg-black/50 hover:text-white focus:outline-none focus:ring-1 focus:ring-white/20"
      >
        <Languages className="h-4 w-4" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full z-[100] mt-2 w-44 overflow-hidden rounded-lg border border-white/5 bg-black/90 shadow-2xl backdrop-blur-sm">
          <div className="flex flex-col gap-1 p-1">
            {i18n.locales.map((locale) => {
              const info = localeInfo[locale];
              const isActive = currentLocale === locale;

              return (
                <Link
                  key={locale}
                  href={redirectedPathName(locale)}
                  onClick={() => setIsOpen(false)}
                  lang={locale}
                  hrefLang={locale}
                  aria-label={`Switch to ${info.name}`}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-all ${
                    isActive
                      ? "bg-white/5 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white/90"
                  }`}
                >
                  <info.flag className="h-4 w-6 rounded-sm border border-white/10" />
                  <span className="font-medium">{info.name}</span>
                  {isActive && (
                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-white/60"></div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
