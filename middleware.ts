import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protect all /admin routes except the auth page itself
export const config = {
  matcher: ["/admin/:path*"],
};

function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a[i] ^ b[i];
  }
  return diff === 0;
}

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(message),
  );
  const bytes = new Uint8Array(sig);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  // Allow the auth page itself
  if (pathname === "/admin/auth") {
    return NextResponse.next();
  }

  const token = req.cookies.get("admin_session")?.value;
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/auth";
    const redirectPath = pathname.startsWith("/admin")
      ? "/admin"
      : pathname + search;
    url.search = `?redirect=${encodeURIComponent(redirectPath)}`;
    return NextResponse.redirect(url);
  }

  const secret =
    process.env.ADMIN_SESSION_SECRET ||
    process.env.NEXT_PUBLIC_ADMIN_SESSION_SECRET;
  if (!secret) {
    // Fail closed if misconfigured
    const url = req.nextUrl.clone();
    url.pathname = "/admin/auth";
    url.search = `?redirect=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(url);
  }

  // Token format: encodeURIComponent(JSON.stringify(payload)).<hex_signature>
  const dot = token.lastIndexOf(".");
  if (dot <= 0) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/auth";
    const redirectPath = pathname.startsWith("/admin")
      ? "/admin"
      : pathname + search;
    url.search = `?redirect=${encodeURIComponent(redirectPath)}`;
    return NextResponse.redirect(url);
  }
  const payloadEnc = token.slice(0, dot);
  const sigHex = token.slice(dot + 1);

  // Verify signature
  const expectedSigHex = await hmacSha256Hex(secret, payloadEnc);
  const a = new Uint8Array(sigHex.length / 2);
  for (let i = 0; i < a.length; i++)
    a[i] = parseInt(sigHex.substr(i * 2, 2), 16);
  const b = new Uint8Array(expectedSigHex.length / 2);
  for (let i = 0; i < b.length; i++)
    b[i] = parseInt(expectedSigHex.substr(i * 2, 2), 16);
  if (!constantTimeEqual(a, b)) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/auth";
    const redirectPath = pathname.startsWith("/admin")
      ? "/admin"
      : pathname + search;
    url.search = `?redirect=${encodeURIComponent(redirectPath)}`;
    return NextResponse.redirect(url);
  }

  // Check expiration
  let payload: { exp: number } | null = null;
  try {
    payload = JSON.parse(decodeURIComponent(payloadEnc));
  } catch {}
  if (
    !payload ||
    typeof payload.exp !== "number" ||
    Date.now() >= payload.exp
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/auth";
    const redirectPath = pathname.startsWith("/admin")
      ? "/admin"
      : pathname + search;
    url.search = `?redirect=${encodeURIComponent(redirectPath)}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
