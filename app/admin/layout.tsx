"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useMemo, useState } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const links = useMemo(
    () => [
      { href: "/admin", label: "Events" },
      { href: "/admin/news", label: "News" },
      { href: "/admin/gallery", label: "Gallery" },
    ],
    [],
  );
  const [open, setOpen] = useState(false);
  const showLogout = pathname !== "/admin/auth";
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 hidden text-3xl font-extrabold tracking-tight lg:block">
        Admin
      </h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Mobile top nav */}
        <div className="lg:hidden">
          <button
            aria-label={open ? "Close admin menu" : "Open admin menu"}
            aria-expanded={open}
            className={
              "mb-2 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold transition"
            }
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <>
                <X width={18} height={18} />
                Close Menu
              </>
            ) : (
              <>
                <Menu width={18} height={18} />
                Open Menu
              </>
            )}
          </button>
          {open && (
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <nav className="text-sm">
                <ul className="space-y-1">
                  {links.map((l) => {
                    const isActive = pathname === l.href;
                    return (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          onClick={() => setOpen(false)}
                          className={
                            "block rounded-lg px-3 py-2 transition " +
                            (isActive
                              ? "bg-[var(--primary)]/20 text-white ring-1 ring-[var(--primary)]"
                              : "text-white/70 hover:bg-white/5 hover:text-white")
                          }
                        >
                          {l.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              {showLogout && (
                <form
                  action="/api/admin/logout"
                  method="POST"
                  className="mt-3"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    await fetch("/api/admin/logout", { method: "POST" });
                    window.location.assign("/admin/auth");
                  }}
                >
                  <button
                    type="submit"
                    className="w-full rounded-lg border border-red-500 bg-red-500/20 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-500/40"
                  >
                    Log out
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        <aside className="hidden lg:block lg:w-[220px] lg:flex-none">
          <div className="sticky top-24 rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur">
            <nav className="text-sm">
              <ul className="space-y-1">
                {links.map((l) => {
                  const isActive = pathname === l.href;
                  return (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className={
                          "block rounded-lg px-3 py-2 transition " +
                          (isActive
                            ? "bg-[var(--primary)]/20 text-white ring-1 ring-[var(--primary)]"
                            : "text-white/70 hover:bg-white/5 hover:text-white")
                        }
                      >
                        {l.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            {showLogout && (
              <form
                action="/api/admin/logout"
                method="POST"
                className="mt-3"
                onSubmit={async (e) => {
                  e.preventDefault();
                  await fetch("/api/admin/logout", { method: "POST" });
                  window.location.assign("/admin/auth");
                }}
              >
                <button
                  type="submit"
                  className="w-full rounded-lg border border-red-500 bg-red-500/20 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-500/40"
                >
                  Log out
                </button>
              </form>
            )}
          </div>
        </aside>

        <div className="min-w-0 flex-1 *:space-y-8">{children}</div>
      </div>
    </div>
  );
}
