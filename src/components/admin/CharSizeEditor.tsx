"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface Props {
  text: string;
  charSizes: number[];
  onChange: (sizes: number[]) => void;
  defaultSize?: number;
}

export default function CharSizeEditor({
  text,
  charSizes,
  onChange,
  defaultSize = 16,
}: Props) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<number | null>(null);

  const chars = Array.from(text);

  const sizes =
    chars.length > 0
      ? chars.map((_, i) => charSizes[i] ?? defaultSize)
      : [];

  // ドラッグ開始
  const handleMouseDown = useCallback((index: number) => {
    setIsDragging(true);
    dragStartRef.current = index;
    setSelected(new Set([index]));
  }, []);

  // ドラッグ中（文字上を通過）
  const handleMouseEnter = useCallback(
    (index: number) => {
      if (!isDragging || dragStartRef.current === null) return;
      const start = Math.min(dragStartRef.current, index);
      const end = Math.max(dragStartRef.current, index);
      const range = new Set<number>();
      for (let i = start; i <= end; i++) {
        range.add(i);
      }
      setSelected(range);
    },
    [isDragging]
  );

  // ドラッグ終了（グローバル mouseup）
  useEffect(() => {
    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        dragStartRef.current = null;
      }
    };
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [isDragging]);

  const handleSliderChange = useCallback(
    (value: number) => {
      const newSizes = [...sizes];
      selected.forEach((i) => {
        if (i < newSizes.length) {
          newSizes[i] = value;
        }
      });
      onChange(newSizes);
    },
    [sizes, selected, onChange]
  );

  const handleReset = useCallback(() => {
    onChange(chars.map(() => defaultSize));
    setSelected(new Set());
  }, [chars, defaultSize, onChange]);

  const handleSelectAll = useCallback(() => {
    setSelected(new Set(chars.map((_, i) => i)));
  }, [chars]);

  if (chars.length === 0) return null;

  const selectedSize =
    selected.size > 0 ? sizes[Array.from(selected)[0]] : defaultSize;

  return (
    <div className="mt-2 border border-gray-100 bg-gray-50/50 p-3">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] text-gray-400 uppercase tracking-wider">
          文字サイズ（ドラッグで範囲選択）
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSelectAll}
            className="text-[10px] text-lapupu-navy hover:underline"
          >
            全選択
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="text-[10px] text-gray-400 hover:text-red-400"
          >
            リセット
          </button>
        </div>
      </div>

      {/* 文字プレビュー（ドラッグで範囲選択） */}
      <div
        className="flex flex-wrap gap-px mb-3 p-2 bg-white border border-gray-100 min-h-[40px] cursor-text select-none"
        onMouseLeave={() => {
          // コンテナ外に出た場合もドラッグ継続（mouseupで終了）
        }}
      >
        {chars.map((char, i) => {
          if (char === "\n") {
            return <div key={i} className="w-full h-0" />;
          }
          const isSelected = selected.has(i);
          return (
            <span
              key={i}
              onMouseDown={(e) => {
                e.preventDefault();
                handleMouseDown(i);
              }}
              onMouseEnter={() => handleMouseEnter(i)}
              className={`inline-flex items-end px-[1px] transition-colors select-none ${
                isSelected
                  ? "bg-blue-100 text-lapupu-navy"
                  : "hover:bg-gray-50"
              }`}
              style={{ fontSize: `${sizes[i]}px`, lineHeight: 1.2 }}
              title={`${sizes[i]}px`}
            >
              {char}
            </span>
          );
        })}
      </div>

      {/* スライダー */}
      {selected.size > 0 && (
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 w-8 text-right">
            {selectedSize}px
          </span>
          <input
            type="range"
            min={10}
            max={48}
            step={1}
            value={selectedSize}
            onChange={(e) => handleSliderChange(Number(e.target.value))}
            className="flex-1 h-1 accent-lapupu-navy"
          />
          <span className="text-[10px] text-gray-300">10〜48px</span>
        </div>
      )}
    </div>
  );
}
