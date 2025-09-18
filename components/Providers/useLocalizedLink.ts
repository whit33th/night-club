import { useLanguage } from "./LanguageProvider";

/**
 * Hook to create localized links that automatically include the current language prefix
 * @returns A function that takes a path and returns the localized path with current language prefix
 */
export function useLocalizedLink() {
  const { lang } = useLanguage();

  return (path: string = ""): string => {
    // Remove leading slash if present to avoid double slashes
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;

    // If path is empty, return just the language prefix
    if (!cleanPath) {
      return `/${lang}`;
    }

    return `/${lang}/${cleanPath}`;
  };
}
