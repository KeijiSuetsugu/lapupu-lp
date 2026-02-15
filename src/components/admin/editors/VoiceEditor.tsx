"use client";

import { VoiceItem } from "@/lib/types";
import Field from "../Field";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  data: VoiceItem[];
  onChange: (data: VoiceItem[]) => void;
}

export default function VoiceEditor({ data, onChange }: Props) {
  const updateItem = (index: number, key: keyof VoiceItem, value: string | number) => {
    const updated = data.map((item, i) =>
      i === index ? { ...item, [key]: value } : item
    );
    onChange(updated);
  };

  const addItem = () => {
    onChange([...data, { name: "", text: "", rating: 5 }]);
  };

  const removeItem = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {data.map((item, i) => (
        <div key={i} className="border border-gray-100 p-4 relative">
          <button
            onClick={() => removeItem(i)}
            className="absolute top-3 right-3 text-gray-300 hover:text-red-400 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <p className="text-xs text-gray-400 mb-3">お客様の声 {i + 1}</p>
          <div className="space-y-3">
            <Field label="お名前（例: 30代 女性）">
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateItem(i, "name", e.target.value)}
                className="admin-input"
                placeholder="30代 女性"
              />
            </Field>
            <Field label="コメント">
              <textarea
                value={item.text}
                onChange={(e) => updateItem(i, "text", e.target.value)}
                rows={3}
                className="admin-input"
              />
            </Field>
            <Field label="評価（1〜5）">
              <select
                value={item.rating}
                onChange={(e) => updateItem(i, "rating", Number(e.target.value))}
                className="admin-input"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {"★".repeat(n)} ({n})
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </div>
      ))}

      <button
        onClick={addItem}
        className="flex items-center gap-2 text-sm text-lapupu-navy hover:text-lapupu-navy-dark transition-colors"
      >
        <Plus className="w-4 h-4" />
        お客様の声を追加
      </button>
    </div>
  );
}
