"use client";

import { SiteSettings } from "@/lib/types";
import Field from "../Field";

interface Props {
  data: SiteSettings;
  onChange: (data: SiteSettings) => void;
}

const sizeLabels = { sm: "小", md: "中", lg: "大" };

function SizeSelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: "sm" | "md" | "lg") => void;
}) {
  return (
    <Field label={label}>
      <div className="flex gap-2">
        {(["sm", "md", "lg"] as const).map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => onChange(size)}
            className={`px-4 py-2 text-sm border transition-colors ${
              value === size
                ? "bg-lapupu-navy text-white border-lapupu-navy"
                : "bg-white text-gray-600 border-gray-200 hover:border-lapupu-navy/40"
            }`}
          >
            {sizeLabels[size]}
          </button>
        ))}
      </div>
    </Field>
  );
}

export default function SettingsEditor({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      <SizeSelect
        label="キャッチコピーの文字サイズ"
        value={data.heroSize}
        onChange={(v) => onChange({ ...data, heroSize: v })}
      />
      <SizeSelect
        label="見出しの文字サイズ"
        value={data.headingSize}
        onChange={(v) => onChange({ ...data, headingSize: v })}
      />
      <SizeSelect
        label="本文の文字サイズ"
        value={data.bodySize}
        onChange={(v) => onChange({ ...data, bodySize: v })}
      />
    </div>
  );
}
