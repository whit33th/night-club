import { ClubEvent } from "@/components/data/events";
import { X } from "lucide-react";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import QRCode from "react-qr-code";

export default function QrPortal({
  event,
  onClose,
}: {
  event: ClubEvent;
  onClose: () => void;
}) {
  const [mounted, setMounted] = React.useState(false);
  const containerRef = React.useRef<HTMLElement | null>(null);
  const [shown, setShown] = React.useState(false);
  const validMonth = new Date(event.date).toLocaleDateString(undefined, {
    month: "long",
  });
  const validDay = new Date(event.date).toLocaleDateString(undefined, {
    day: "2-digit",
  });
  useEffect(() => {
    setMounted(true);
    containerRef.current = document.body;
    const id = requestAnimationFrame(() => setShown(true));
    // Lock scroll while modal open
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(id);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, []);
  if (!mounted || !containerRef.current) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] grid place-items-center bg-black/80 p-4 backdrop-blur-md transition-opacity duration-200 ${
        shown ? "opacity-100" : "opacity-0"
      }`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          e.stopPropagation();
          onClose();
        }
      }}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
      >
        <div className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(194,12,12,0.35),transparent_60%)] blur-3xl" />
      </div>

      {/* Gradient-framed card */}
      <div
        className={`relative w-full max-w-sm p-[2px] sm:max-w-md md:max-w-lg ${
          shown ? "scale-100" : "scale-95"
        } transition-transform duration-200`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="absolute -inset-10 -z-10 animate-pulse rounded-[28px] bg-[conic-gradient(at_20%_20%,rgba(255,255,255,0.25),rgba(194,12,12,0.35),rgba(255,255,255,0.15),transparent_60%)] blur-3xl" />
        <div className="rounded-2xl bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(255,255,255,0.92))] text-black shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 border-b border-black/10 p-3 sm:p-4">
            <div className="min-w-0">
              <p className="truncate text-[10px] uppercase tracking-wider text-black/60">
                Ticket for
              </p>
              <h4 className="truncate text-base font-extrabold sm:text-lg">
                {event.title}
              </h4>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
              className="inline-grid h-8 w-8 place-items-center rounded-full bg-black/80 text-white hover:bg-black"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* QR core */}
          <div className="relative grid place-items-center p-5 sm:p-6">
            {/* glow ring */}
            <div
              aria-hidden
              className="absolute inset-0 grid place-items-center"
            >
              <div className="h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(194,12,12,0.25),transparent_65%)] blur-2xl sm:h-64 sm:w-64" />
            </div>
            <div className="relative rounded-xl bg-white p-3 shadow-xl">
              <div className="absolute inset-0 -z-10 rounded-xl bg-[conic-gradient(at_50%_50%,rgba(0,0,0,0.08),transparent_25%)]" />
              <div className="flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64">
                <QRCode
                  value={`https://example.com/ticket/${event.slug}`}
                  size={512}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
            <p className="mt-4 select-all text-center text-xs tracking-wide text-black/70">
              Scan at the entrance
            </p>
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-center gap-3 rounded-b-2xl border-t border-black/10 bg-black/5 p-3">
            <span className="rounded-full bg-black/10 px-2 py-1 text-[10px] uppercase tracking-wide text-black/60">
              Valid: {validMonth} {validDay}
            </span>
          </div>
        </div>
      </div>
    </div>,
    containerRef.current,
  );
}
