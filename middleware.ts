import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n } from "./lib/i18n-config";

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|manifest.json|robots.txt|sitemap.xml|videos|.*\\.(?:png|jpg|webp|jpeg|svg|gif|ico|mp4|webm|ogg)).*)",
  ],
};

function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a[i] ^ b[i];
  }
  return diff === 0;
}

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(message),
  );
  const bytes = new Uint8Array(sig);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") ?? undefined;
  const headers = { "accept-language": acceptLanguage || "" };
  const languages = new Negotiator({ headers }).languages();

  return match(languages, i18n.locales, i18n.defaultLocale);
}

export default async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (
    !pathnameHasLocale &&
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/api")
  ) {
    const locale = getLocale(req);
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }

  if (pathname.includes("/admin")) {
    if (pathname.endsWith("/admin/auth")) {
      return NextResponse.next();
    }

    const token = req.cookies.get("admin_session")?.value;
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/auth";
      const redirectPath = pathname.startsWith("/admin")
        ? "/admin"
        : pathname + search;
      url.search = `?redirect=${encodeURIComponent(redirectPath)}`;
      return NextResponse.redirect(url);
    }

    const secret =
      process.env.ADMIN_SESSION_SECRET ||
      process.env.NEXT_PUBLIC_ADMIN_SESSION_SECRET;
    if (!secret) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/auth";
      url.search = `?redirect=${encodeURIComponent(pathname + search)}`;
      return NextResponse.redirect(url);
    }

    const dot = token.lastIndexOf(".");
    if (dot <= 0) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/auth";
      const redirectPath = pathname.startsWith("/admin")
        ? "/admin"
        : pathname + search;
      url.search = `?redirect=${encodeURIComponent(redirectPath)}`;
      return NextResponse.redirect(url);
    }
    const payloadEnc = token.slice(0, dot);
    const sigHex = token.slice(dot + 1);

    const expectedSigHex = await hmacSha256Hex(secret, payloadEnc);
    const a = new Uint8Array(sigHex.length / 2);
    for (let i = 0; i < a.length; i++)
      a[i] = parseInt(sigHex.substr(i * 2, 2), 16);
    const b = new Uint8Array(expectedSigHex.length / 2);
    for (let i = 0; i < b.length; i++)
      b[i] = parseInt(expectedSigHex.substr(i * 2, 2), 16);
    if (!constantTimeEqual(a, b)) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/auth";
      const redirectPath = pathname.startsWith("/admin")
        ? "/admin"
        : pathname + search;
      url.search = `?redirect=${encodeURIComponent(redirectPath)}`;
      return NextResponse.redirect(url);
    }

    let payload: { exp: number } | null = null;
    try {
      payload = JSON.parse(decodeURIComponent(payloadEnc));
    } catch {}
    if (
      !payload ||
      typeof payload.exp !== "number" ||
      Date.now() >= payload.exp
    ) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/auth";
      const redirectPath = pathname.startsWith("/admin")
        ? "/admin"
        : pathname + search;
      url.search = `?redirect=${encodeURIComponent(redirectPath)}`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
