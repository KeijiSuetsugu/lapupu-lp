import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
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
      <body className={`${notoSansJP.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
