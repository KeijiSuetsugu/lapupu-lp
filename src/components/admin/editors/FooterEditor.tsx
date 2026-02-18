"use client";

import { FooterData } from "@/lib/types";
import Field from "../Field";
import CharSizeEditor from "../CharSizeEditor";

interface Props {
  data: FooterData;
  onChange: (data: FooterData) => void;
  charStyles: Record<string, number[]>;
  onCharStyleChange: (key: string, sizes: number[]) => void;
}

export default function FooterEditor({ data, onChange, charStyles, onCharStyleChange }: Props) {
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
        <CharSizeEditor
          text={data.copyright}
          charSizes={charStyles["footer.copyright"] ?? []}
          onChange={(sizes) => onCharStyleChange("footer.copyright", sizes)}
        />
      </Field>
    </div>
  );
}
