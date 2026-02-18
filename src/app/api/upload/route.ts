import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isAuthenticated } from "@/lib/auth";

export async function POST(request: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "ファイルが選択されていません" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "JPEG, PNG, WebPのみ対応しています" }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "ファイルサイズは5MB以下にしてください" }, { status: 400 });
    }

    // Vercel Blob が利用可能な場合
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const timestamp = Date.now();
      const ext = file.name.split(".").pop() || "jpg";
      const filename = `lapupu/${timestamp}.${ext}`;

      const blob = await put(filename, file, {
        access: "public",
      });

      return NextResponse.json({ url: blob.url });
    }

    // ローカル開発: public/images/ に保存
    const fs = await import("fs");
    const path = await import("path");
    const timestamp = Date.now();
    const ext = file.name.split(".").pop() || "jpg";
    const fileName = `${timestamp}.${ext}`;
    const filePath = path.join(process.cwd(), "public", "images", fileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({ url: `/images/${fileName}` });
  } catch {
    return NextResponse.json({ error: "アップロードに失敗しました" }, { status: 500 });
  }
}
