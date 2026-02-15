"use client";

import { FooterData } from "@/lib/types";
import Field from "../Field";

interface Props {
  data: FooterData;
  onChange: (data: FooterData) => void;
}

export default function FooterEditor({ data, onChange }: Props) {
  return (
    <div>
      <Field label="コピーライト">
        <input
          type="text"
          value={data.copyright}
          onChange={(e) => onChange({ ...data, copyright: e.target.value })}
          className="admin-input"
          placeholder="© 2024 Lapupu All Rights Reserved."
        />
      </Field>
    </div>
  );
}
