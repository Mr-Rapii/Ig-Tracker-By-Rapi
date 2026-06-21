import { NextRequest, NextResponse } from "next/server";
import { parseFollowersFollowing } from "@/lib/parseInstagramData";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_SIZE_BYTES = 50 * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Tidak ada file yang diunggah." }, { status: 400 });
    }
    if (!file.name.toLowerCase().endsWith(".zip")) {
      return NextResponse.json({ error: "File harus berformat .zip." }, { status: 400 });
    }
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: "Ukuran file melebihi batas maksimal 50MB." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const result = parseFollowersFollowing(buffer);

    return NextResponse.json({
      notFollowingBack: result.notFollowingBack,
      followersCount: result.followersCount,
      followingCount: result.followingCount,
      warnings: result.warnings,
      total: result.notFollowingBack.length,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Terjadi kesalahan saat memproses file." },
      { status: 422 }
    );
  }
}
