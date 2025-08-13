"use client";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { navLinks } from "./Header";
export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen, open]);

  const location = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [location, setOpen]);

  return (
    <aside
      className={`fixed inset-0 top-14 z-[61] w-full -translate-y-full border-b border-[color-mix(in_srgb,var(--primary)_20%,transparent)] bg-black/85 backdrop-blur-2xl transition-transform will-change-transform lg:hidden ${open ? "translate-y-0" : "-translate-y-full"}`}
      role="dialog"
      aria-modal
      aria-labelledby="sidebar-title"
      aria-describedby="sidebar-description"
      aria-hidden={!open}
    >
      <div className="relative h-full w-full">
        {/* mild glow "wow" effect */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(ellipse_at_bottom,rgba(185,53,16,0.22),transparent_60%)] blur-2xl" />

        <ul className="flex flex-col">
          {navLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex border border-transparent px-4 py-4 text-3xl font-semibold text-white/90 transition hover:border-[color-mix(in_srgb,var(--primary)_25%,transparent)] hover:bg-[color-mix(in_srgb,var(--primary)_10%,transparent)]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Bottom extras: socials + posters */}
        <div className="absolute inset-x-0 bottom-0 space-y-3 border-t border-white/10 px-4 pb-6 pt-4">
          <div className="flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/60">
              Follow us
            </p>
            <div className="flex items-center gap-2">
              <Link
                href="https://instagram.com/yourclub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center justify-center rounded-full border border-white/15 p-2 text-white/80 transition hover:border-white/30 hover:bg-white/5 hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                href="https://x.com/yourclub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="inline-flex items-center justify-center rounded-full border border-white/15 p-2 text-white/80 transition hover:border-white/30 hover:bg-white/5 hover:text-white"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="https://facebook.com/yourclub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex items-center justify-center rounded-full border border-white/15 p-2 text-white/80 transition hover:border-white/30 hover:bg-white/5 hover:text-white"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="https://youtube.com/@yourclub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="inline-flex items-center justify-center rounded-full border border-white/15 p-2 text-white/80 transition hover:border-white/30 hover:bg-white/5 hover:text-white"
              >
                <Youtube className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {["1.jpg", "2.webp", "3.webp", "4.jpg", "5.jpg", "5.jpg"]
              .slice(0, 5)
              .map((name) => (
                <Link
                  key={name}
                  href="/events"
                  onClick={() => setOpen(false)}
                  className="group relative block aspect-square overflow-hidden rounded-md"
                >
                  <Image
                    src={`/imgs/posters/${name}`}
                    alt="Poster"
                    width={120}
                    height={120}
                    className="aspect-square w-full object-cover transition will-change-transform group-hover:scale-[1.05]"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition group-hover:opacity-100" />
                </Link>
              ))}
          </div>

          <Link
            href="/events"
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.02] px-3 py-2 text-center text-xs font-semibold tracking-wide text-white/90 transition hover:border-white/30 hover:bg-white/[0.06]"
          >
            All events
          </Link>
        </div>
      </div>
    </aside>
  );
}
