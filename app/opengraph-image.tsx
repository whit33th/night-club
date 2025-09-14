import { clubInfo } from "@/lib/data/club-info";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = `${clubInfo.name} Night Club`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background:
            "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #333333 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontSize: 120,
              fontWeight: "bold",
              background: "linear-gradient(45deg, #ffffff, #cccccc)",
              backgroundClip: "text",
              color: "transparent",
              letterSpacing: "-0.05em",
            }}
          >
            {clubInfo.name}
          </div>
        </div>

        <div
          style={{
            fontSize: 36,
            color: "#cccccc",
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Klub muzyczno-eventowy w Poznaniu
        </div>

        <div
          style={{
            fontSize: 28,
            color: "#888888",
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Koncerty • DJ-sety • Imprezy • Wynajem przestrzeni
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 40,
            fontSize: 24,
            color: "#666666",
          }}
        >
          {clubInfo.name}.pl • {clubInfo.address.street} {clubInfo.address.city}
        </div>
      </div>
    ),
    size,
  );
}
