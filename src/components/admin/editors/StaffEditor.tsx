"use client";

import { StaffItem } from "@/lib/types";
import Field from "../Field";
import CharSizeEditor from "../CharSizeEditor";
import ImageUploader from "../ImageUploader";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  data: StaffItem[];
  onChange: (data: StaffItem[]) => void;
  charStyles: Record<string, number[]>;
  onCharStyleChange: (key: string, sizes: number[]) => void;
  imagePositions: Record<string, { x: number; y: number }>;
  onImagePositionChange: (key: string, pos: { x: number; y: number }) => void;
}

export default function StaffEditor({ data, onChange, charStyles, onCharStyleChange, imagePositions, onImagePositionChange }: Props) {
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
              <CharSizeEditor
                text={item.name}
                charSizes={charStyles[`staff.${i}.name`] ?? []}
                onChange={(sizes) => onCharStyleChange(`staff.${i}.name`, sizes)}
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
              <CharSizeEditor
                text={item.role}
                charSizes={charStyles[`staff.${i}.role`] ?? []}
                onChange={(sizes) => onCharStyleChange(`staff.${i}.role`, sizes)}
              />
            </Field>
            <Field label="自己紹介文">
              <textarea
                value={item.bio}
                onChange={(e) => updateItem(i, "bio", e.target.value)}
                rows={4}
                className="admin-input"
              />
              <CharSizeEditor
                text={item.bio}
                charSizes={charStyles[`staff.${i}.bio`] ?? []}
                onChange={(sizes) => onCharStyleChange(`staff.${i}.bio`, sizes)}
              />
            </Field>
            <Field label="写真">
              <input
                type="text"
                value={item.imageUrl}
                onChange={(e) => updateItem(i, "imageUrl", e.target.value)}
                className="admin-input"
                placeholder="/images/staff-1.jpg"
              />
              <ImageUploader
                currentUrl={item.imageUrl}
                onUpload={(url) => updateItem(i, "imageUrl", url)}
                position={imagePositions[`staff.${i}.image`]}
                onPositionChange={(pos) => onImagePositionChange(`staff.${i}.image`, pos)}
              />
            </Field>
          </div>
        </div>
      ))}

      <button
        onClick={addItem}
        className="flex items-center gap-2 text-sm text-lapupu-brown hover:text-lapupu-brown-dark transition-colors"
      >
        <Plus className="w-4 h-4" />
        スタッフを追加
      </button>
    </div>
  );
}
