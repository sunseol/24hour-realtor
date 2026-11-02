/** @type {import('next').NextConfig} */
const nextConfig = {
  // @react-pdf/renderer: 번들링 시 pdfkit 표준폰트 동적 require가 깨짐 → 서버 외부 패키지로 지정
  serverExternalPackages: ["@react-pdf/renderer"],
  // Keystatic CMS 콘텐츠(YAML)를 서버리스 번들에 포함 — force-dynamic 페이지가
  // 런타임에 fs로 읽는 파일이라 output tracing 대상에 명시해야 배포 환경에서 누락되지 않음
  outputFileTracingIncludes: {
    "/": ["./content/**/*"],
    "/request": ["./content/**/*"],
    "/listing/[id]/pdf": [
      "./content/**/*",
      "./public/images/**/*",
      "./public/fonts/**/*",
      "./node_modules/pdfkit/**/*",
    ],
  },
};

export default nextConfig;
