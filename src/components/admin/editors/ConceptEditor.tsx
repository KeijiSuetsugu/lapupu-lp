"use client";

import { ConceptData } from "@/lib/types";
import Field from "../Field";

interface Props {
  data: ConceptData;
  onChange: (data: ConceptData) => void;
}

export default function ConceptEditor({ data, onChange }: Props) {
  const update = (key: keyof ConceptData, value: string) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div className="space-y-4">
      <Field label="セクションタイトル">
        <input
          type="text"
          value={data.title}
          onChange={(e) => update("title", e.target.value)}
          className="admin-input"
        />
      </Field>
      <Field label="本文（改行は↵Enterで入力）">
        <textarea
          value={data.body}
          onChange={(e) => update("body", e.target.value)}
          rows={5}
          className="admin-input"
        />
      </Field>
      <Field label="画像URL（/images/concept.jpg または外部URL）">
        <input
          type="text"
          value={data.imageUrl}
          onChange={(e) => update("imageUrl", e.target.value)}
          className="admin-input"
          placeholder="/images/concept.jpg"
        />
      </Field>
    </div>
  );
}
