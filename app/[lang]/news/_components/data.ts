export type NewsItem = {
  id: string;
  title: string;
  date: string;
  img: string;
  excerpt: string;
  body: string;
};

export const NEWS_ITEMS: Array<NewsItem> = [
  {
    id: "new-resident-dj",
    title: "New Resident DJ",
    date: "2025-08-01",
    img: "/imgs/1.jpg",
    excerpt: "Welcome Ghost Unit.",
    body: "Welcome Ghost Unit. Minimal pressure, deep grooves.",
  },
  {
    id: "season-opening",
    title: "Season Opening",
    date: "2025-09-15",
    img: "/imgs/posters/2.webp",
    excerpt: "Lineup announced soon.",
    body: "Season is back. Lineup announced soon.",
  },
  {
    id: "extended-hours",
    title: "Extended Hours",
    date: "2025-10-02",
    img: "/imgs/posters/3.webp",
    excerpt: "Friday into dawn. Minimal vibes.",
    body: "Friday into dawn. Minimal vibes.",
  },
  {
    id: "lights-and-smoke",
    title: "Lights & Smoke",
    date: "2025-10-12",
    img: "/imgs/4.jpg",
    excerpt: "Atmospherics update.",
    body: "Atmospherics update across the floor.",
  },
];
