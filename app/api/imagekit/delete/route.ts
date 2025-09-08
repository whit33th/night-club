import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const ids: string[] = Array.isArray(body?.ids) ? body.ids : [];
    if (!ids.length) {
      return NextResponse.json({ error: "ids required" }, { status: 400 });
    }
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    if (!privateKey)
      return NextResponse.json(
        { error: "Missing private key" },
        { status: 500 },
      );
    const basic = Buffer.from(`${privateKey}:`).toString("base64");
    const results = await Promise.allSettled(
      ids.map((id) =>
        fetch(`https://api.imagekit.io/v1/files/${encodeURIComponent(id)}`, {
          method: "DELETE",
          headers: { Authorization: `Basic ${basic}` },
        }),
      ),
    );
    const summary = results.map((r, i) => ({
      id: ids[i],
      ok: r.status === "fulfilled" && (r.value as Response)?.ok === true,
    }));
    return NextResponse.json({
      deleted: summary.filter((s) => s.ok).map((s) => s.id),
      summary,
    });
  } catch {
    return NextResponse.json({ error: "Delete error" }, { status: 500 });
  }
}
