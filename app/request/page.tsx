import type { Metadata } from "next";
import RequestForm from "@/components/RequestForm";

export const metadata: Metadata = {
  title: "매물 알림 등록 — 24부동산",
  description:
    "원하는 조건을 등록하세요. 조건에 맞는 매물이 들어오면 가장 먼저 보내드립니다.",
};

export default function Page() {
  return <RequestForm />;
}
