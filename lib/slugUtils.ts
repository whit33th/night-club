// Common slug generation utilities for events and news

export const generateSlug = (title: string, date: string, id: string) => {
  const titleSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${titleSlug}-${date}-${id}`;
};

export const extractIdFromSlug = (slug: string): string => {
  const parts = slug.split("-");
  return parts[parts.length - 1] ?? "";
};
