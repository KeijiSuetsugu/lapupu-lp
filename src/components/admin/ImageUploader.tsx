"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Upload, RotateCcw } from "lucide-react";
import Image from "next/image";

interface Props {
  currentUrl: string;
  onUpload: (url: string) => void;
  position?: { x: number; y: number };
  onPositionChange?: (pos: { x: number; y: number }) => void;
}

export default function ImageUploader({
  currentUrl,
  onUpload,
  position,
  onPositionChange,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number; posX: number; posY: number } | null>(null);

  const posX = position?.x ?? 50;
  const posY = position?.y ?? 50;

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

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!onPositionChange) return;
      e.preventDefault();
      setDragging(true);
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        posX,
        posY,
      };
    },
    [posX, posY, onPositionChange]
  );

  useEffect(() => {
    if (!dragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragStartRef.current || !containerRef.current || !onPositionChange) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;

      // ドラッグ方向と逆にobject-positionを動かす（画像を掴んで動かす感覚）
      const newX = Math.max(0, Math.min(100, dragStartRef.current.posX - (dx / rect.width) * 100));
      const newY = Math.max(0, Math.min(100, dragStartRef.current.posY - (dy / rect.height) * 100));

      onPositionChange({ x: Math.round(newX), y: Math.round(newY) });
    };

    const handleMouseUp = () => {
      setDragging(false);
      dragStartRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, onPositionChange]);

  const handleReset = () => {
    onPositionChange?.({ x: 50, y: 50 });
  };

  return (
    <div className="mt-2">
      {hasImage && (
        <div>
          <div
            ref={containerRef}
            className={`relative w-full max-w-[300px] aspect-video mb-1 rounded-lg overflow-hidden bg-gray-100 ${
              onPositionChange
                ? dragging
                  ? "cursor-grabbing"
                  : "cursor-grab"
                : ""
            }`}
            onMouseDown={handleMouseDown}
          >
            <Image
              src={currentUrl}
              alt="プレビュー"
              fill
              className="object-cover pointer-events-none"
              style={{ objectPosition: `${posX}% ${posY}%` }}
              unoptimized
            />
            {onPositionChange && (
              <div className="absolute bottom-1 left-1 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded">
                {posX}%, {posY}%
              </div>
            )}
          </div>
          {onPositionChange && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-[10px] text-gray-400 hover:text-lapupu-brown transition-colors mb-1"
            >
              <RotateCcw className="w-3 h-3" />
              中央に戻す
            </button>
          )}
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
        {onPositionChange && " ・ドラッグで表示位置を調整"}
      </p>
    </div>
  );
}
