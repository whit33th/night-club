export const generateEventSlug = (
  title: string,
  date: string,
  id: string,
): string => {
  return `${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")}-${date}-${id}`;
};

export const getEventImageSrc = (
  imageKitPath?: string,
  imageKitId?: string,
): string => {
  return imageKitPath
    ? imageKitPath
    : imageKitId
      ? `/${imageKitId}`
      : "/imgs/posters/1.jpg";
};
