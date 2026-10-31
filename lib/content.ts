import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";

export interface CMSListing {
  id: string;
  name: string;
  district: string;
  trade: string;
  price: string;
  area: string;
  floor: string;
  dir: string;
  moveIn: string;
  type: string;
  status: "live" | "talk" | "done";
  img: string;
  x: number;
  y: number;
  lat: number;
  lng: number;
}

export interface SiteContent {
  heroTitle: string;
  dealCount: string;
  disputeCount: string;
  responseMin: string;
  email: string;
  phone: string;
  hours: string;
  address: string;
  license: string;
  insurance: string;
}

const reader = createReader(process.cwd(), keystaticConfig);

export async function getListings(): Promise<CMSListing[]> {
  const entries = await reader.collections.listings.all();
  return entries
    .map(({ slug, entry }) => ({
      id: String(entry.id || slug),
      name: entry.name ?? "",
      district: entry.district ?? "",
      trade: entry.trade ?? "매매",
      price: entry.price ?? "",
      area: entry.area ?? "",
      floor: entry.floor ?? "",
      dir: entry.dir ?? "",
      moveIn: entry.moveIn ?? "",
      type: entry.type ?? "",
      status: (entry.status as CMSListing["status"]) ?? "live",
      img: entry.image ?? "/images/luxury-pool.jpg",
      x: typeof entry.x === "number" ? entry.x : 50,
      y: typeof entry.y === "number" ? entry.y : 50,
      lat: typeof entry.lat === "number" ? entry.lat : 37.55,
      lng: typeof entry.lng === "number" ? entry.lng : 127.0,
    }))
    .sort((a, b) => a.id.localeCompare(b.id));
}

export async function getSite(): Promise<SiteContent> {
  const site = await reader.singletons.site.read();
  return {
    heroTitle: site?.heroTitle ?? "검증된 매물만 올립니다.",
    dealCount: site?.dealCount ?? "1,842",
    disputeCount: site?.disputeCount ?? "0",
    responseMin: site?.responseMin ?? "9분",
    email: site?.email ?? "desk@24estate.kr",
    phone: site?.phone ?? "02-511-0024",
    hours: site?.hours ?? "24시간 · 연중무휴",
    address: site?.address ?? "도산대로 462, 4층",
    license: site?.license ?? "중개사무소 제2026-0001호",
    insurance: site?.insurance ?? "부동산중개공제 가입",
  };
}
