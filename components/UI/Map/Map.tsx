"use client";
import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function Map() {
  const [darkMode, setDarkMode] = useState(true);
  const [mapSrc, setMapSrc] = useState("");

  useEffect(() => {
    // Получаем язык браузера
    const userLang = navigator.language.split("-")[0] ?? "en"; // 'en', 'es', 'ru', etc.
    const userRegion = navigator.language.split("-")[1] ?? "us"; // 'us', 'es', 'pl', etc.

    // Базовый URL карты
    const baseUrl =
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2433.5490885396357!2d16.923884177585617!3d52.41484794400827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47045b106e260c41%3A0xac121510659f9c3e!2sKlub%202progi!5e0!3m2!1s";

    // Формируем URL с правильным языком и регионом
    const fullUrl = `${baseUrl}${userLang}!2s${userRegion}!4v1754916082310!5m2!1s${userLang}!2s${userRegion}`;

    setMapSrc(fullUrl);
  }, []);

  if (!mapSrc) {
    return null;
  }

  return (
    <section className="relative aspect-video max-h-96 w-full overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--primary)_25%,transparent)]">
      <button
        onClick={() => setDarkMode((v) => !v)}
        className={`absolute right-4 top-4 z-10 flex aspect-square items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold shadow transition ${
          darkMode
            ? "border border-black/10 bg-white/80 text-black hover:bg-white/90"
            : "bg-black/70 text-white hover:bg-black/90"
        }`}
        type="button"
        aria-label="Toggle map color scheme"
      >
        {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>

      <iframe
        src={mapSrc}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full border-0"
        style={
          darkMode
            ? { filter: "invert(1) hue-rotate(180deg)" }
            : { filter: "none" }
        }
        title="Club location"
        aria-label="Map"
      />
    </section>
  );
}
