import { NextResponse } from "next/server";

function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

export async function POST(req: Request) {
  const { password } = (await req.json().catch(() => ({}))) as {
    password?: string;
  };
  if (!password) {
    return NextResponse.json({ error: "Missing password" }, { status: 400 });
  }
  const adminPassword = process.env.ADMIN_PASSWORD;
  const sessionSecret =
    process.env.ADMIN_SESSION_SECRET ||
    process.env.NEXT_PUBLIC_ADMIN_SESSION_SECRET;
  if (!adminPassword || !sessionSecret) {
    return NextResponse.json(
      { error: "Server not configured" },
      { status: 500 },
    );
  }

  const enc = new TextEncoder();
  const ok = constantTimeEqual(enc.encode(password), enc.encode(adminPassword));
  if (!ok) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const exp = Date.now() + 1000 * 60 * 60 * 12;
  const payload = encodeURIComponent(JSON.stringify({ exp }));
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(sessionSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  const bytes = new Uint8Array(sig);
  const sigHex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const token = `${payload}.${sigHex}`;

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return res;
}
