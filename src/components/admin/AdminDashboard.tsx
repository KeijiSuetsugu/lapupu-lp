"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ContentData } from "@/lib/types";
import SectionEditor from "./SectionEditor";
import HeroEditor from "./editors/HeroEditor";
import ConceptEditor from "./editors/ConceptEditor";
import FeaturesEditor from "./editors/FeaturesEditor";
import MenuEditor from "./editors/MenuEditor";
import VoiceEditor from "./editors/VoiceEditor";
import StaffEditor from "./editors/StaffEditor";
import AccessEditor from "./editors/AccessEditor";
import ContactEditor from "./editors/ContactEditor";
import FooterEditor from "./editors/FooterEditor";

interface Props {
  initialContent: ContentData;
}

export default function AdminDashboard({ initialContent }: Props) {
  const [content, setContent] = useState<ContentData>(initialContent);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const charStyles = content.charStyles ?? {};

  const updateCharStyle = (key: string, sizes: number[]) => {
    setContent({
      ...content,
      charStyles: { ...charStyles, [key]: sizes },
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSaved(false);

    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });

    setSaving(false);

    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "保存に失敗しました");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-lapupu-brown text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div>
          <h1 className="text-lg font-light tracking-[0.3em]">LAPUPU</h1>
          <p className="text-xs text-white/40 tracking-wider">管理画面</p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            className="text-xs text-white/60 hover:text-white transition-colors tracking-wider"
          >
            サイトを確認 →
          </a>
          <button
            onClick={handleLogout}
            className="text-xs text-white/60 hover:text-white transition-colors tracking-wider"
          >
            ログアウト
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Save status */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            各セクションを編集して、最後に「全体を保存」ボタンを押してください。
          </p>
          <div className="flex items-center gap-3">
            {saved && (
              <span className="text-green-600 text-sm">✓ 保存しました</span>
            )}
            {error && (
              <span className="text-red-500 text-sm">{error}</span>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-lapupu-brown text-white px-6 py-2.5 text-sm tracking-wider hover:bg-lapupu-brown-dark transition-colors disabled:opacity-50 min-w-[120px]"
            >
              {saving ? "保存中..." : "全体を保存"}
            </button>
          </div>
        </div>

        {/* Section editors */}
        <div className="space-y-4">
          <SectionEditor title="Hero（ファーストビュー）">
            <HeroEditor
              data={content.hero}
              onChange={(hero) => setContent({ ...content, hero })}
              charStyles={charStyles}
              onCharStyleChange={updateCharStyle}
            />
          </SectionEditor>

          <SectionEditor title="コンセプト">
            <ConceptEditor
              data={content.concept}
              onChange={(concept) => setContent({ ...content, concept })}
              charStyles={charStyles}
              onCharStyleChange={updateCharStyle}
            />
          </SectionEditor>

          <SectionEditor title="特徴・強み">
            <FeaturesEditor
              data={content.features}
              onChange={(features) => setContent({ ...content, features })}
              charStyles={charStyles}
              onCharStyleChange={updateCharStyle}
            />
          </SectionEditor>

          <SectionEditor title="メニュー・料金">
            <MenuEditor
              data={content.menu}
              onChange={(menu) => setContent({ ...content, menu })}
              charStyles={charStyles}
              onCharStyleChange={updateCharStyle}
            />
          </SectionEditor>

          <SectionEditor title="お客様の声">
            <VoiceEditor
              data={content.voice}
              onChange={(voice) => setContent({ ...content, voice })}
              charStyles={charStyles}
              onCharStyleChange={updateCharStyle}
            />
          </SectionEditor>

          <SectionEditor title="スタッフ紹介">
            <StaffEditor
              data={content.staff}
              onChange={(staff) => setContent({ ...content, staff })}
              charStyles={charStyles}
              onCharStyleChange={updateCharStyle}
            />
          </SectionEditor>

          <SectionEditor title="アクセス">
            <AccessEditor
              data={content.access}
              onChange={(access) => setContent({ ...content, access })}
              charStyles={charStyles}
              onCharStyleChange={updateCharStyle}
            />
          </SectionEditor>

          <SectionEditor title="予約・連絡先">
            <ContactEditor
              data={content.contact}
              onChange={(contact) => setContent({ ...content, contact })}
              charStyles={charStyles}
              onCharStyleChange={updateCharStyle}
            />
          </SectionEditor>

          <SectionEditor title="フッター">
            <FooterEditor
              data={content.footer}
              onChange={(footer) => setContent({ ...content, footer })}
              charStyles={charStyles}
              onCharStyleChange={updateCharStyle}
            />
          </SectionEditor>
        </div>

        {/* Bottom save button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-lapupu-brown text-white px-10 py-3 text-sm tracking-wider hover:bg-lapupu-brown-dark transition-colors disabled:opacity-50"
          >
            {saving ? "保存中..." : "全体を保存"}
          </button>
        </div>
      </div>
    </div>
  );
}
