"use client";

import { FeatureItem } from "@/lib/types";
import Field from "../Field";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  data: FeatureItem[];
  onChange: (data: FeatureItem[]) => void;
}

const ICON_OPTIONS = ["sparkles", "heart", "clock", "star", "leaf", "shield"];

export default function FeaturesEditor({ data, onChange }: Props) {
  const updateItem = (index: number, key: keyof FeatureItem, value: string) => {
    const updated = data.map((item, i) =>
      i === index ? { ...item, [key]: value } : item
    );
    onChange(updated);
  };

  const addItem = () => {
    onChange([...data, { icon: "sparkles", title: "", body: "" }]);
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
          <p className="text-xs text-gray-400 mb-3">特徴 {i + 1}</p>
          <div className="space-y-3">
            <Field label="アイコン">
              <select
                value={item.icon}
                onChange={(e) => updateItem(i, "icon", e.target.value)}
                className="admin-input"
              >
                {ICON_OPTIONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="タイトル">
              <input
                type="text"
                value={item.title}
                onChange={(e) => updateItem(i, "title", e.target.value)}
                className="admin-input"
              />
            </Field>
            <Field label="説明文">
              <textarea
                value={item.body}
                onChange={(e) => updateItem(i, "body", e.target.value)}
                rows={3}
                className="admin-input"
              />
            </Field>
          </div>
        </div>
      ))}

      <button
        onClick={addItem}
        className="flex items-center gap-2 text-sm text-lapupu-navy hover:text-lapupu-navy-dark transition-colors"
      >
        <Plus className="w-4 h-4" />
        特徴を追加
      </button>
    </div>
  );
}
