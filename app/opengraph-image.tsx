import { ImageResponse } from "next/og";

export const alt = "BoiCircle book giveaway";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8fafc",
          color: "#0f172a",
          padding: 64,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(15,81,50,0.12), rgba(225,29,72,0.10))",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 48,
            width: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              width: 220,
              height: 220,
              borderRadius: 48,
              background: "#0f5132",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 34,
                right: 34,
                width: 58,
                height: 58,
                borderRadius: 999,
                background: "#e11d48",
              }}
            />
            <div
              style={{
                width: 112,
                height: 132,
                borderRadius: 14,
                background: "#f8fafc",
                border: "10px solid #d1fae5",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div
              style={{
                fontSize: 88,
                fontWeight: 800,
                letterSpacing: 0,
                lineHeight: 1,
              }}
            >
              BoiCircle
            </div>
            <div
              style={{
                fontSize: 34,
                lineHeight: 1.3,
                color: "#334155",
                maxWidth: 760,
              }}
            >
              Give unused books a second life with readers across Bangladesh.
            </div>
            <div
              style={{
                display: "flex",
                gap: 16,
                fontSize: 26,
                color: "#0f5132",
                fontWeight: 700,
              }}
            >
              Free books
              <span style={{ color: "#94a3b8" }}>•</span>
              Local pickup
              <span style={{ color: "#94a3b8" }}>•</span>
              Reader community
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
