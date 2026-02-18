"use client";

import { ConceptData } from "@/lib/types";
import Field from "../Field";
import CharSizeEditor from "../CharSizeEditor";
import ImageUploader from "../ImageUploader";

interface Props {
  data: ConceptData;
  onChange: (data: ConceptData) => void;
  charStyles: Record<string, number[]>;
  onCharStyleChange: (key: string, sizes: number[]) => void;
  imagePositions: Record<string, { x: number; y: number }>;
  onImagePositionChange: (key: string, pos: { x: number; y: number }) => void;
}

export default function ConceptEditor({ data, onChange, charStyles, onCharStyleChange, imagePositions, onImagePositionChange }: Props) {
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
        <CharSizeEditor
          text={data.title}
          charSizes={charStyles["concept.title"] ?? []}
          onChange={(sizes) => onCharStyleChange("concept.title", sizes)}
        />
      </Field>
      <Field label="本文（改行は↵Enterで入力）">
        <textarea
          value={data.body}
          onChange={(e) => update("body", e.target.value)}
          rows={5}
          className="admin-input"
        />
        <CharSizeEditor
          text={data.body}
          charSizes={charStyles["concept.body"] ?? []}
          onChange={(sizes) => onCharStyleChange("concept.body", sizes)}
        />
      </Field>
      <Field label="画像">
        <input
          type="text"
          value={data.imageUrl}
          onChange={(e) => update("imageUrl", e.target.value)}
          className="admin-input"
          placeholder="/images/concept.jpg"
        />
        <ImageUploader
          currentUrl={data.imageUrl}
          onUpload={(url) => update("imageUrl", url)}
          position={imagePositions["concept.image"]}
          onPositionChange={(pos) => onImagePositionChange("concept.image", pos)}
        />
      </Field>
    </div>
  );
}
