"use client";

import { StaffItem } from "@/lib/types";
import Field from "../Field";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  data: StaffItem[];
  onChange: (data: StaffItem[]) => void;
}

export default function StaffEditor({ data, onChange }: Props) {
  const updateItem = (index: number, key: keyof StaffItem, value: string) => {
    const updated = data.map((item, i) =>
      i === index ? { ...item, [key]: value } : item
    );
    onChange(updated);
  };

  const addItem = () => {
    onChange([...data, { name: "", role: "", bio: "", imageUrl: "" }]);
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
          <p className="text-xs text-gray-400 mb-3">スタッフ {i + 1}</p>
          <div className="space-y-3">
            <Field label="名前">
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateItem(i, "name", e.target.value)}
                className="admin-input"
              />
            </Field>
            <Field label="役職・肩書き">
              <input
                type="text"
                value={item.role}
                onChange={(e) => updateItem(i, "role", e.target.value)}
                className="admin-input"
                placeholder="代表・ヘッドケアセラピスト"
              />
            </Field>
            <Field label="自己紹介文">
              <textarea
                value={item.bio}
                onChange={(e) => updateItem(i, "bio", e.target.value)}
                rows={4}
                className="admin-input"
              />
            </Field>
            <Field label="写真URL（/images/staff-1.jpg または外部URL）">
              <input
                type="text"
                value={item.imageUrl}
                onChange={(e) => updateItem(i, "imageUrl", e.target.value)}
                className="admin-input"
                placeholder="/images/staff-1.jpg"
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
        スタッフを追加
      </button>
    </div>
  );
}
