export type StatusKey = "live" | "talk" | "done";

export interface Listing {
  id: string;
  name: string;
  district: string;
  price: { ko: string; en: string };
  area: string;
  floor: { ko: string; en: string };
  dir: { ko: string; en: string };
  move: { ko: string; en: string };
  type: { ko: string; en: string };
  status: StatusKey;
  img: string;
  x: number;
  y: number;
}

export const LISTINGS: Listing[] = [
  {
    id: "SE-014",
    name: "한남더힐 1차",
    district: "한남동",
    price: { ko: "매매 62억", en: "Sale ₩6.2B" },
    area: "245.7㎡",
    floor: { ko: "3층", en: "3F" },
    dir: { ko: "남향", en: "South" },
    move: { ko: "즉시", en: "Now" },
    type: { ko: "아파트", en: "Apartment" },
    status: "talk",
    img: "/img/luxury-pool.jpg",
    x: 30,
    y: 34,
  },
  {
    id: "SE-023",
    name: "반포 서래더원",
    district: "반포동",
    price: { ko: "전세 18억", en: "Jeonse ₩1.8B" },
    area: "84.9㎡",
    floor: { ko: "27층", en: "27F" },
    dir: { ko: "남향", en: "South" },
    move: { ko: "2026.02", en: "Feb 2026" },
    type: { ko: "아파트", en: "Apartment" },
    status: "live",
    img: "/img/int-living.jpg",
    x: 46,
    y: 52,
  },
  {
    id: "SE-031",
    name: "청담 트라팰리스",
    district: "청담동",
    price: { ko: "전세 25억", en: "Jeonse ₩2.5B" },
    area: "195.3㎡",
    floor: { ko: "6층", en: "6F" },
    dir: { ko: "남서향", en: "South-West" },
    move: { ko: "2026.04", en: "Apr 2026" },
    type: { ko: "아파트", en: "Apartment" },
    status: "live",
    img: "/img/int-apartment.jpg",
    x: 56,
    y: 36,
  },
  {
    id: "OF-042",
    name: "성수 수직정원",
    district: "성수동",
    price: { ko: "전세 9억", en: "Jeonse ₩900M" },
    area: "112.4㎡",
    floor: { ko: "복층", en: "Duplex" },
    dir: { ko: "남향", en: "South" },
    move: { ko: "즉시", en: "Now" },
    type: { ko: "오피스텔", en: "Officetel" },
    status: "live",
    img: "/img/int-loft.jpg",
    x: 38,
    y: 66,
  },
  {
    id: "RE-057",
    name: "연희연가",
    district: "연희동",
    price: { ko: "매매 23억", en: "Sale ₩2.3B" },
    area: "148.2㎡",
    floor: { ko: "단독", en: "Detached" },
    dir: { ko: "남향", en: "South" },
    move: { ko: "즉시", en: "Now" },
    type: { ko: "주택", en: "House" },
    status: "done",
    img: "/img/house-dusk.jpg",
    x: 22,
    y: 58,
  },
];

export const STATUS_LABEL: Record<
  StatusKey,
  { ko: string; en: string; cls: string }
> = {
  live: { ko: "거래가능", en: "Available", cls: "live" },
  talk: { ko: "협의중", en: "In Talks", cls: "talk" },
  done: { ko: "거래완료", en: "Closed", cls: "done" },
};
