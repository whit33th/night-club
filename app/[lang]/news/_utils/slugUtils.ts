import { generateSlug, extractIdFromSlug } from "@/lib/slugUtils";

export const generateNewsSlug = (title: string, date: string, id: string) => {
  return generateSlug(title, date, id);
};

export const extractNewsIdFromSlug = (slug: string): string => {
  return extractIdFromSlug(slug);
};
