import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "2progi Night Club";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(90deg, #000000 0%, #1a1a1a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: "bold",
              color: "white",
              marginBottom: 20,
              letterSpacing: "-0.03em",
            }}
          >
            2progi
          </div>

          <div
            style={{
              fontSize: 32,
              color: "#cccccc",
              marginBottom: 16,
              lineHeight: 1.3,
            }}
          >
            Klub muzyczno-eventowy Poznań
          </div>

          <div
            style={{
              fontSize: 24,
              color: "#888888",
              display: "flex",
              gap: 20,
            }}
          >
            <span>Muzyka</span>
            <span>Taniec</span>
            <span>Bar</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 200,
            height: 200,
            background: "linear-gradient(135deg, #333333, #666666)",
            borderRadius: "50%",
            fontSize: 72,
            fontWeight: "bold",
            color: "white",
          }}
        >
          2P
        </div>
      </div>
    ),
    size,
  );
}
