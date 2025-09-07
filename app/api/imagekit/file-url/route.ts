import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    if (!privateKey)
      return NextResponse.json(
        { error: "Missing private key" },
        { status: 500 },
      );
    const basic = Buffer.from(`${privateKey}:`).toString("base64");
    const resp = await fetch(
      `https://api.imagekit.io/v1/files/${encodeURIComponent(id)}/details`,
      {
        headers: { Authorization: `Basic ${basic}` },
        cache: "no-store",
      },
    );
    if (!resp.ok) {
      return NextResponse.json({ error: "Not found" }, { status: resp.status });
    }
    const json = (await resp.json()) as { url?: string };
    if (!json?.url)
      return NextResponse.json({ error: "No url" }, { status: 404 });
    return NextResponse.json({ url: json.url });
  } catch {
    return NextResponse.json({ error: "Lookup error" }, { status: 500 });
  }
}
