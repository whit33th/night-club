"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter, type LucideIcon } from "lucide-react";

type NavLink = { href: string; label: string };
type NavSection = { title: string; links: Array<NavLink> };
type SocialLink = { href: string; label: string; Icon: LucideIcon };
type PaymentIcon = { src: string; alt: string };

const SECTION_TITLE_CLASS = "text-xs uppercase tracking-[0.2em] text-white/60";
const LINK_CLASS = "text-white/85 transition hover:text-white";
const SOCIAL_ICON_CLASS = "h-5 w-5";

const NAV_SECTIONS: Array<NavSection> = [
  {
    title: "Info",
    links: [
      { href: "/about", label: "About" },
      { href: "/events", label: "Events" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "More",
    links: [
      { href: "/news", label: "News" },
      { href: "/gallery", label: "Gallery" },
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/terms", label: "Terms" },
    ],
  },
  {
    title: "Contact",
    links: [
      { href: "mailto:info@2progi.club", label: "info@2progi.club" },
      { href: "tel:+1234567890", label: "+1 (234) 567-890" },
    ],
  },
];

const SOCIAL_LINKS: Array<SocialLink> = [
  {
    href: "https://instagram.com/yourclub",
    label: "Instagram",
    Icon: Instagram,
  },
  {
    href: "https://x.com/yourclub",
    label: "Twitter",
    Icon: Twitter,
  },
  {
    href: "https://facebook.com/yourclub",
    label: "Facebook",
    Icon: Facebook,
  },
];

const PAYMENT_ICONS: Array<PaymentIcon> = [
  { src: "/imgs/payments/visa.svg", alt: "Visa" },
  { src: "/imgs/payments/mastercard.svg", alt: "Mastercard" },
  { src: "/imgs/payments/paypal.svg", alt: "PayPal" },
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

export default function Footer() {
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
            © 2025, 2Progi.pl
          </div>
        </div>
      </div>
    </footer>
  );
}
