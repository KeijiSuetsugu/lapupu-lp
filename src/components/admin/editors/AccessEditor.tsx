"use client";

import { AccessData, AccessHour } from "@/lib/types";
import Field from "../Field";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  data: AccessData;
  onChange: (data: AccessData) => void;
}

export default function AccessEditor({ data, onChange }: Props) {
  const update = (key: keyof AccessData, value: string) => {
    onChange({ ...data, [key]: value });
  };

  const updateHour = (index: number, key: keyof AccessHour, value: string) => {
    const hours = data.hours.map((h, i) =>
      i === index ? { ...h, [key]: value } : h
    );
    onChange({ ...data, hours });
  };

  const addHour = () => {
    onChange({ ...data, hours: [...data.hours, { days: "", time: "" }] });
  };

  const removeHour = (index: number) => {
    onChange({ ...data, hours: data.hours.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-4">
      <Field label="住所">
        <input
          type="text"
          value={data.address}
          onChange={(e) => update("address", e.target.value)}
          className="admin-input"
          placeholder="福岡県北九州市八幡西区..."
        />
      </Field>
      <Field label="電話番号 / 連絡先">
        <input
          type="text"
          value={data.tel}
          onChange={(e) => update("tel", e.target.value)}
          className="admin-input"
          placeholder="090-xxxx-xxxx"
        />
      </Field>

      <div>
        <label className="block text-xs text-gray-500 tracking-wider mb-3 uppercase">
          営業時間
        </label>
        <div className="space-y-2">
          {data.hours.map((hour, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                type="text"
                value={hour.days}
                onChange={(e) => updateHour(i, "days", e.target.value)}
                className="admin-input flex-1"
                placeholder="月〜金"
              />
              <input
                type="text"
                value={hour.time}
                onChange={(e) => updateHour(i, "time", e.target.value)}
                className="admin-input flex-1"
                placeholder="10:00〜20:00"
              />
              <button
                onClick={() => removeHour(i)}
                className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            onClick={addHour}
            className="flex items-center gap-2 text-sm text-lapupu-navy hover:text-lapupu-navy-dark transition-colors mt-2"
          >
            <Plus className="w-4 h-4" />
            時間帯を追加
          </button>
        </div>
      </div>

      <Field label="GoogleマップのEmbedURL">
        <textarea
          value={data.googleMapEmbedUrl}
          onChange={(e) => update("googleMapEmbedUrl", e.target.value)}
          rows={3}
          className="admin-input"
          placeholder="https://www.google.com/maps/embed?pb=..."
        />
        <p className="text-xs text-gray-400 mt-1">
          ※ Google Maps で「共有」→「地図を埋め込む」からURLをコピーしてください
        </p>
      </Field>
    </div>
  );
}
