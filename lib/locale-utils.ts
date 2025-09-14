import { i18n } from "@/lib/i18n-config";
import { NextRequest } from "next/server";

export function getLocale(request: NextRequest): string {
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocaleFromHeaders(request) || i18n.defaultLocale;
    return locale;
  }

  const segments = pathname.split("/");
  const locale = segments[1];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (i18n.locales.includes(locale as any)) {
    return locale;
  }

  return i18n.defaultLocale;
}

function getLocaleFromHeaders(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");

  if (acceptLanguage) {
    const languages = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim().toLowerCase());

    for (const lang of languages) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (i18n.locales.includes(lang as any)) {
        return lang;
      }

      const langCode = lang.split("-")[0];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (i18n.locales.includes(langCode as any)) {
        return langCode;
      }
    }
  }

  return i18n.defaultLocale;
}
