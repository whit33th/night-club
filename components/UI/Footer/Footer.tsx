"use client";

import { Facebook, Instagram, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/lib/i18n-config";
import { Dict } from "@/lib/get-dictionary-client";

type NavLink = { href: string; label: string };
type NavSection = { title: string; links: Array<NavLink> };
type SocialLink = { href: string; label: string; Icon: LucideIcon };

const SECTION_TITLE_CLASS = "text-xs uppercase tracking-[0.2em] text-white/60";
const LINK_CLASS = "text-white/85 transition hover:text-white";
const SOCIAL_ICON_CLASS = "h-5 w-5";

const SOCIAL_LINKS: Array<SocialLink> = [
  {
    href: "https://instagram.com/2progi",
    label: "Instagram",
    Icon: Instagram,
  },
  {
    href: "https://facebook.com/2progi",
    label: "Facebook",
    Icon: Facebook,
  },
];

function FooterSection({ title, links }: NavSection) {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <p className={SECTION_TITLE_CLASS}>{title}</p>
      {links.map(({ href, label }) => (
        <Link key={href} href={href} className={LINK_CLASS}>
          {label}
        </Link>
      ))}
    </div>
  );
}

export default function Footer({ lang, dict }: { lang: Locale; dict: Dict }) {
  const NAV_SECTIONS: Array<NavSection> = [
    {
      title: "Info",
      links: [
        { href: `/${lang}/about`, label: dict.navigation.about },
        { href: `/${lang}/events`, label: dict.navigation.events },
        { href: `/${lang}/faq`, label: dict.navigation.faq },
      ],
    },
    {
      title: "More",
      links: [
        { href: `/${lang}/news`, label: dict.navigation.news },
        { href: `/${lang}/gallery`, label: dict.navigation.gallery },
        { href: `/${lang}/legal/privacy`, label: "Privacy" },
        { href: `/${lang}/legal/terms`, label: "Terms" },
      ],
    },
    {
      title: dict.navigation.contact,
      links: [
        { href: "mailto:biuro@2progi.pl", label: "biuro@2progi.pl" },
        { href: "tel:+48606277256", label: "+48 606 277 256" },
      ],
    },
  ];

  return (
    <footer className="w-full border-t border-white/10 bg-black/20 px-4 py-6 text-white backdrop-blur-3xl">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Brand: full width on small screens */}
        <div className="flex items-start gap-3">
          <Image src="/imgs/logo.png" alt="Logo" width={32} height={32} />
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-wide">
              2Progi Night Club
            </p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/70">
              After Dark · Neon Heart
            </p>
          </div>
        </div>

        {/* Links: 2 columns on small screens, 4 on md+ */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {NAV_SECTIONS.map((section) => (
            <FooterSection key={section.title} {...section} />
          ))}
        </div>

        {/* Bottom bar: Payments + Social + Copyright */}
        <div className="flex flex-col items-start gap-3 border-t border-white/10 pt-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/80 transition hover:text-white"
                >
                  <Icon className={SOCIAL_ICON_CLASS} />
                </Link>
              ))}
            </div>
          </div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-white/50">
            {dict.footer.rights}
          </div>
        </div>
      </div>
    </footer>
  );
}
