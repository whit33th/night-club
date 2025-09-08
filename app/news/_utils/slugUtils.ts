import { generateSlug, extractIdFromSlug } from "@/lib/slugUtils";

// News-specific slug generation using common utilities
export const generateNewsSlug = (title: string, date: string, id: string) => {
  return generateSlug(title, date, id);
};

// Function to extract ID from news slug
export const extractNewsIdFromSlug = (slug: string): string => {
  return extractIdFromSlug(slug);
};
