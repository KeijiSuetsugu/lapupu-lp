"use client";

import { HeroData } from "@/lib/types";
import Field from "../Field";

interface Props {
  data: HeroData;
  onChange: (data: HeroData) => void;
}

export default function HeroEditor({ data, onChange }: Props) {
  const update = (key: keyof HeroData, value: string) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div className="space-y-4">
      <Field label="キャッチコピー（改行は↵Enterで入力）">
        <textarea
          value={data.catchcopy}
          onChange={(e) => update("catchcopy", e.target.value)}
          rows={3}
          className="admin-input"
        />
      </Field>
      <Field label="サブテキスト（所在地・補足）">
        <input
          type="text"
          value={data.subtext}
          onChange={(e) => update("subtext", e.target.value)}
          className="admin-input"
        />
      </Field>
      <Field label="CTAボタンのテキスト">
        <input
          type="text"
          value={data.ctaLabel}
          onChange={(e) => update("ctaLabel", e.target.value)}
          className="admin-input"
        />
      </Field>
      <Field label="CTAボタンのリンク先URL（LINE等）">
        <input
          type="url"
          value={data.ctaUrl}
          onChange={(e) => update("ctaUrl", e.target.value)}
          className="admin-input"
          placeholder="https://line.me/..."
        />
      </Field>
      <Field label="背景画像URL（/images/hero-bg.jpg または外部URL）">
        <input
          type="text"
          value={data.bgImageUrl}
          onChange={(e) => update("bgImageUrl", e.target.value)}
          className="admin-input"
          placeholder="/images/hero-bg.jpg"
        />
        <p className="text-xs text-gray-400 mt-1">
          ※ 画像ファイルは public/images/ フォルダに配置してください
        </p>
      </Field>
    </div>
  );
}
