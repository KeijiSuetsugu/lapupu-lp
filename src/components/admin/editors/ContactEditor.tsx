"use client";

import { ContactData } from "@/lib/types";
import Field from "../Field";

interface Props {
  data: ContactData;
  onChange: (data: ContactData) => void;
}

export default function ContactEditor({ data, onChange }: Props) {
  const update = (key: keyof ContactData, value: string) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div className="space-y-4">
      <Field label="LINE URL">
        <input
          type="url"
          value={data.lineUrl}
          onChange={(e) => update("lineUrl", e.target.value)}
          className="admin-input"
          placeholder="https://line.me/..."
        />
      </Field>
      <Field label="Instagram URL">
        <input
          type="url"
          value={data.instagramUrl}
          onChange={(e) => update("instagramUrl", e.target.value)}
          className="admin-input"
          placeholder="https://instagram.com/..."
        />
      </Field>
      <Field label="予約案内文（改行は↵Enterで入力）">
        <textarea
          value={data.reservationNote}
          onChange={(e) => update("reservationNote", e.target.value)}
          rows={3}
          className="admin-input"
        />
      </Field>
    </div>
  );
}
