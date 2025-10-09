"use client";

import { SocialLinks } from "@/components/Containers/SocialLinks";
import { useLanguage } from "@/components/Providers/LanguageProvider";
import { useLocalizedLink } from "@/components/Providers/useLocalizedLink";
import { clubInfo } from "@/lib/data/club-info";
import Image from "next/image";
import Link from "next/link";

type NavLink = { href: string; label: string };
type NavSection = { title: string; links: Array<NavLink> };

const SECTION_TITLE_CLASS = "text-xs uppercase tracking-[0.2em] text-white/60";
const LINK_CLASS = "text-white/85 transition hover:text-white";

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

export default function Footer() {
  const { dict } = useLanguage();
  const localizedLink = useLocalizedLink();

  const NAV_SECTIONS: Array<NavSection> = [
    {
      title: "Info",
      links: [
        { href: localizedLink("faq"), label: dict.navigation.faq },
        { href: localizedLink("about"), label: dict.navigation.about },
        { href: localizedLink("events"), label: dict.navigation.events },
      ],
    },
    {
      title: dict.navigation.more,
      links: [
        { href: localizedLink("news"), label: dict.navigation.news },
        { href: localizedLink("gallery"), label: dict.navigation.gallery },
        {
          href: localizedLink("legal/privacy"),
          label: dict.navigation.privacy,
        },
        { href: localizedLink("legal/terms"), label: dict.navigation.terms },
      ],
    },
    {
      title: dict.navigation.contact,
      links: [
        { href: "mailto:biuro@2progi.pl", label: clubInfo.email },
        { href: "tel:+48606277256", label: clubInfo.phone },
      ],
    },
    {
      title: dict.navigation.address,
      links: [
        {
          href: "https://maps.app.goo.gl/aSZb81XLDtQXi2Q66",
          label: clubInfo.address.street + ", " + clubInfo.address.city,
        },
      ],
    },
  ];

  return (
    <footer className="w-full border-t border-white/10 bg-black/20 px-4 py-6 text-white backdrop-blur-3xl">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Brand: full width on small screens */}
        <div className="flex items-start gap-3">
          <Image
            src="/imgs/logo.png"
            alt="Logo"
            width={32}
            height={32}
            priority
          />
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
              <SocialLinks />
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
