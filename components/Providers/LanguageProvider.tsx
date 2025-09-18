"use client";

import { createContext, useContext, ReactNode } from "react";
import { Locale } from "@/lib/i18n-config";
import { Dict } from "@/lib/get-dictionary-client";

interface LanguageContextType {
  lang: Locale;
  dict: Dict;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({
  children,
  lang,
  dict,
}: {
  children: ReactNode;
  lang: Locale;
  dict: Dict;
}) {
  return (
    <LanguageContext.Provider value={{ lang, dict }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export function useLanguageSafe() {
  const context = useContext(LanguageContext);
  return context;
}
