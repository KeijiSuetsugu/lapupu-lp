"use client";

import { MenuItem } from "@/lib/types";
import Field from "../Field";
import CharSizeEditor from "../CharSizeEditor";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  data: MenuItem[];
  onChange: (data: MenuItem[]) => void;
  charStyles: Record<string, number[]>;
  onCharStyleChange: (key: string, sizes: number[]) => void;
}

export default function MenuEditor({ data, onChange, charStyles, onCharStyleChange }: Props) {
  const updateItem = (index: number, key: keyof MenuItem, value: string) => {
    const updated = data.map((item, i) =>
      i === index ? { ...item, [key]: value } : item
    );
    onChange(updated);
  };

  const addItem = () => {
    onChange([...data, { name: "", price: "", description: "" }]);
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
          <p className="text-xs text-gray-400 mb-3">メニュー {i + 1}</p>
          <div className="space-y-3">
            <Field label="メニュー名">
              <textarea
                value={item.name}
                onChange={(e) => updateItem(i, "name", e.target.value)}
                rows={3}
                className="admin-input"
                placeholder={"脳疲労×小顔\nヘッドセラピー"}
              />
              <CharSizeEditor
                text={item.name}
                charSizes={charStyles[`menu.${i}.name`] ?? []}
                onChange={(sizes) => onCharStyleChange(`menu.${i}.name`, sizes)}
              />
            </Field>
            <Field label="料金（例: ¥8,000）">
              <input
                type="text"
                value={item.price}
                onChange={(e) => updateItem(i, "price", e.target.value)}
                className="admin-input"
                placeholder="¥8,000"
              />
              <CharSizeEditor
                text={item.price}
                charSizes={charStyles[`menu.${i}.price`] ?? []}
                onChange={(sizes) => onCharStyleChange(`menu.${i}.price`, sizes)}
              />
            </Field>
            <Field label="説明文">
              <textarea
                value={item.description}
                onChange={(e) => updateItem(i, "description", e.target.value)}
                rows={2}
                className="admin-input"
              />
              <CharSizeEditor
                text={item.description}
                charSizes={charStyles[`menu.${i}.description`] ?? []}
                onChange={(sizes) => onCharStyleChange(`menu.${i}.description`, sizes)}
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
        メニューを追加
      </button>
    </div>
  );
}
