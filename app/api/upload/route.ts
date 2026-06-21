import { NextRequest, NextResponse } from "next/server";
import { parseInstagramZip } from "@/lib/parseInstagramData";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_SIZE_BYTES = 50 * 1024 * 1024; // 50MB

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Tidak ada file yang diunggah." },
        { status: 400 }
      );
    }

    if (!file.name.toLowerCase().endsWith(".zip")) {
      return NextResponse.json(
        { error: "File harus berformat .zip." },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: "Ukuran file melebihi batas maksimal 50MB." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Processing happens entirely in-memory; nothing is written to disk
    // and the buffer is discarded once the response is sent.
    const result = parseInstagramZip(buffer);

    return NextResponse.json({
      pending: result.pending,
      warnings: result.warnings,
      total: result.pending.length,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Terjadi kesalahan saat memproses file." },
      { status: 422 }
    );
  }
}
