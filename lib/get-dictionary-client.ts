import type { Locale } from "./i18n-config";
import pl from "../dictionaries/pl.json";
import en from "../dictionaries/en.json";

export type Dict = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string | number]: any;
};

const dictionaries = {
  pl,
  en,
};

export const getDictionaryClient = (locale: Locale) => dictionaries[locale];
