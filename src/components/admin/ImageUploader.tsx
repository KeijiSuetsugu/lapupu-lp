"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import Image from "next/image";

interface Props {
  currentUrl: string;
  onUpload: (url: string) => void;
}

export default function ImageUploader({ currentUrl, onUpload }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const hasImage =
    currentUrl &&
    currentUrl !== "/images/hero-bg.jpg" &&
    currentUrl !== "/images/concept.jpg" &&
    currentUrl !== "/images/staff-1.jpg";

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "アップロードに失敗しました");
        return;
      }

      onUpload(data.url);
    } catch {
      setError("アップロードに失敗しました");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="mt-2">
      {hasImage && (
        <div className="relative w-full max-w-[200px] aspect-video mb-2 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={currentUrl}
            alt="プレビュー"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="inline-flex items-center gap-2 text-xs text-lapupu-brown hover:text-lapupu-brown-dark transition-colors disabled:opacity-50"
      >
        <Upload className="w-3.5 h-3.5" />
        {uploading ? "アップロード中..." : "画像をアップロード"}
      </button>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      <p className="text-[10px] text-gray-400 mt-1">
        JPEG, PNG, WebP（5MB以下）
      </p>
    </div>
  );
}
