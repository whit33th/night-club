import crypto from "crypto";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    if (!publicKey || !privateKey) {
      return NextResponse.json(
        { error: "Missing ImageKit env vars" },
        { status: 500 },
      );
    }
    const token = crypto.randomBytes(16).toString("hex");
    const expire = Math.floor(Date.now() / 1000) + 60 * 10;
    const signature = crypto
      .createHmac("sha1", privateKey)
      .update(token + expire)
      .digest("hex");
    return NextResponse.json({ token, expire, signature, publicKey });
  } catch {
    return NextResponse.json({ error: "Auth error" }, { status: 500 });
  }
}
