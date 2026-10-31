import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "24부동산 — 검증된 매물만 올립니다",
  description:
    "서울의 프라이빗 부동산 인덱스. 문서로 검증된 매물, 24시간 상담. 원하는 조건을 등록하면 맞는 매물이 들어올 때 가장 먼저 보내드립니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={interTight.variable}>
        {/* Noto Sans KR — 런타임 로딩 (한글 유니코드레인지 슬라이스 포함) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        {children}
      </body>
    </html>
  );
}
