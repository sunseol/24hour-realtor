export const defaultServices = [
  {
    _id: 1,
    title: "주거용 부동산",
    description: "아파트, 빌라, 원룸 등 다양한 주거 형태의 매물을 전문적으로 관리합니다.",
    colorClass: "from-blue-600 to-blue-800",
    iconType: "home"
  },
  {
    _id: 2,
    title: "상업용 부동산",
    description: "오피스, 상가, 투자용 부동산의 입지 분석과 컨설팅을 제공합니다.",
    colorClass: "from-amber-600 to-amber-800",
    iconType: "building"
  },
  {
    _id: 3,
    title: "부동산 투자 자문",
    description: "시장 분석 기반의 안정적이고 수익성 높은 투자 포트폴리오를 제안합니다.",
    colorClass: "from-emerald-600 to-emerald-800",
    iconType: "trending"
  },
  {
    _id: 4,
    title: "자산 관리",
    description: "고객님의 자산을 안전하게 관리하고 가치를 극대화하는 솔루션을 제공합니다.",
    colorClass: "from-purple-600 to-purple-800",
    iconType: "shield"
  }
];

export const defaultListings = [
  {
    _id: 1,
    title: "삼성동 래미안 아파트",
    type: "매매",
    price: "12억 5,000만",
    typeColor: "bg-amber-500",
    specs: "84㎡ · 3 bedroom · 2 bath",
    tags: ["남향", "역세권", "단기"],
    gradientClass: "from-slate-700 to-slate-900",
    address: "서울시 강남구 삼성동",
    floor: "15층/25층",
    built: "2019년",
    description: "강남 프리미엄 입지의 래미안 아파트입니다. 삼성역 도보 5분 거리로 교통이 편리하며, 남향으로 채광이 뛰어납니다.",
    features: ["주차가능", "엘리베이터", "보안시스템", "헬스장"]
  },
  {
    _id: 2,
    title: "역삼동 프라임 오피스",
    type: "전세",
    price: "5억",
    typeColor: "bg-blue-500",
    specs: "120㎡ · 4인 사무실",
    tags: ["신축", "주차가능", "역세권"],
    gradientClass: "from-slate-600 to-slate-800",
    address: "서울시 강남구 역삼동",
    floor: "8층/20층",
    built: "2023년",
    description: "역삼역 바로 앞 신축 프라임 오피스입니다. 최신 시설과 넓은 주차장을 갖추고 있어 업무 환경이 쾌적합니다.",
    features: ["주차가능", "회의실", "공용라운지", "24시간출입"]
  },
  {
    _id: 3,
    title: "청담동 빌라",
    type: "월세",
    price: "300/80",
    typeColor: "bg-emerald-500",
    specs: "65㎡ · 2 bedroom · 1 bath",
    tags: ["풀옵션", "즉시입주"],
    gradientClass: "from-slate-800 to-slate-950",
    address: "서울시 강남구 청담동",
    floor: "3층/4층",
    built: "2020년",
    description: "청담동 고급 빌라입니다. 풀옵션으로 즉시 입주 가능하며, 조용한 주거환경을 제공합니다.",
    features: ["풀옵션", "주차가능", "세탁기", "에어컨"]
  },
  {
    _id: 4,
    title: "압구정동 현대 아파트",
    type: "매매",
    price: "28억",
    typeColor: "bg-amber-500",
    specs: "145㎡ · 4 bedroom · 2 bath",
    tags: ["한강뷰", "리모델링", "명품단지"],
    gradientClass: "from-indigo-700 to-indigo-900",
    address: "서울시 강남구 압구정동",
    floor: "22층/28층",
    built: "1987년 (2022년 리모델링)",
    description: "압구정 현대아파트 로얄층입니다. 한강 조망이 뛰어나며, 전면 리모델링으로 최신 시설을 갖추고 있습니다.",
    features: ["한강뷰", "주차가능", "커뮤니티시설", "경비시스템"]
  },
  {
    _id: 5,
    title: "논현동 상가",
    type: "월세",
    price: "5000/300",
    typeColor: "bg-emerald-500",
    specs: "85㎡ · 1층 코너",
    tags: ["유동인구多", "코너매장", "즉시입주"],
    gradientClass: "from-rose-600 to-rose-800",
    address: "서울시 강남구 논현동",
    floor: "1층",
    built: "2018년",
    description: "논현역 사거리 코너 상가입니다. 유동인구가 많아 다양한 업종에 적합하며, 즉시 입주 가능합니다.",
    features: ["코너매장", "주차가능", "화장실", "에어컨"]
  },
  {
    _id: 6,
    title: "서초동 타워팰리스",
    type: "전세",
    price: "15억",
    typeColor: "bg-blue-500",
    specs: "198㎡ · 5 bedroom · 3 bath",
    tags: ["고급주거", "헬스장", "수영장"],
    gradientClass: "from-violet-700 to-violet-900",
    address: "서울시 서초구 서초동",
    floor: "35층/45층",
    built: "2002년",
    description: "서초동 랜드마크 타워팰리스입니다. 최고급 커뮤니티 시설과 완벽한 보안 시스템을 갖추고 있습니다.",
    features: ["수영장", "헬스장", "사우나", "컨시어지"]
  }
];

export const defaultCompanyInfo = {
  companyName: "24시 코리아 부동산",
  companyNameEn: "24-HOUR REALTOR",
  phone: "1588-0000",
  email: "contact@24realtor.com",
  address: "서울특별시 중구 을지로 281 DDP (동대문디자인플라자)",
  businessHours: {
    weekday: "09:00 - 20:00",
    weekend: "10:00 - 18:00",
    online: "24시간"
  }
};

export const navLinks = [
  { name: "서비스", href: "/", hash: "#services" },
  { name: "매물안내", href: "/properties" },
  { name: "회사소개", href: "/about" },
  { name: "상담예약", href: "/contact" }
];

export const seoulDistricts = [
  "강남구", "강동구", "강북구", "강서구", "관악구",
  "광진구", "구로구", "금천구", "노원구", "도봉구",
  "동대문구", "동작구", "마포구", "서대문구", "서초구",
  "성동구", "성북구", "송파구", "양천구", "영등포구",
  "용산구", "은평구", "종로구", "중구", "중랑구"
];

export const propertyTypes = [
  { value: "all", label: "전체" },
  { value: "매매", label: "매매" },
  { value: "전세", label: "전세" },
  { value: "월세", label: "월세" }
];
