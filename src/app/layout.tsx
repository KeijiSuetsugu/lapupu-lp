import type { Metadata } from "next";
import { Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";

const zenMaruGothic = Zen_Maru_Gothic({
  subsets: ["latin"],
  variable: "--font-zen-maru",
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lapupu | 首・肩・頭が軽くなるヘッドケア専門サロン",
  description:
    "北九州市八幡西区のプライベートヘッドケアサロン「Lapupu」。頭皮・頭蓋骨への専門アプローチで首・肩のこり・眼精疲労を根本から解消。完全個室で安心のプライベート空間。",
  openGraph: {
    title: "Lapupu | 首・肩・頭が軽くなるヘッドケア専門サロン",
    description:
      "北九州市八幡西区のプライベートヘッドケアサロン。頭皮・頭蓋骨への専門アプローチで心身を解放します。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${zenMaruGothic.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
