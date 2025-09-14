import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "2progi Night Club",
    short_name: "2progi",
    description:
      "2progi — klub muzyczno-eventowy w Poznaniu z najlepszymi DJ-ami",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    orientation: "portrait-primary",
    categories: ["entertainment", "lifestyle", "music"],
    lang: "pl",
    scope: "/",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/imgs/logo.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Wydarzenia",
        short_name: "Wydarzenia",
        description: "Nadchodzące wydarzenia",
        url: "/events",
        icons: [{ src: "/web-app-manifest-192x192.png", sizes: "192x192" }],
      },
      {
        name: "Galeria",
        short_name: "Galeria",
        description: "Zdjęcia z wydarzeń",
        url: "/gallery",
        icons: [{ src: "/web-app-manifest-192x192.png", sizes: "192x192" }],
      },
      {
        name: "Aktualności",
        short_name: "News",
        description: "Najnowsze wiadomości klubu",
        url: "/news",
        icons: [{ src: "/web-app-manifest-192x192.png", sizes: "192x192" }],
      },
      {
        name: "O nas",
        short_name: "O nas",
        description: "Informacje o klubie",
        url: "/about",
        icons: [{ src: "/web-app-manifest-192x192.png", sizes: "192x192" }],
      },
    ],
  };
}
