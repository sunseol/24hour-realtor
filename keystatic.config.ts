import { config, fields, collection, singleton } from "@keystatic/core";

export default config({
  storage: { kind: "local" },
  ui: {
    brand: { name: "24부동산 관리자" },
    navigation: {
      콘텐츠: ["listings"],
      설정: ["site"],
    },
  },
  collections: {
    listings: collection({
      label: "매물",
      slugField: "id",
      path: "content/listings/*",
      format: { data: "yaml" },
      entryLayout: "form",
      schema: {
        id: fields.text({
          label: "관리번호 (예: SE-014)",
          validation: { isRequired: true },
        }),
        name: fields.text({
          label: "매물명",
          validation: { isRequired: true },
        }),
        district: fields.text({ label: "위치 (예: 한남동)" }),
        trade: fields.select({
          label: "거래 방식",
          options: [
            { label: "매매", value: "매매" },
            { label: "전세", value: "전세" },
            { label: "월세", value: "월세" },
          ],
          defaultValue: "매매",
        }),
        price: fields.text({
          label: "금액 (예: 매매 62억)",
          validation: { isRequired: true },
        }),
        area: fields.text({ label: "전용면적 (예: 84.9㎡)" }),
        floor: fields.text({ label: "층 / 형태" }),
        dir: fields.text({ label: "방위" }),
        moveIn: fields.text({ label: "입주" }),
        type: fields.select({
          label: "유형",
          options: [
            { label: "아파트", value: "아파트" },
            { label: "오피스텔", value: "오피스텔" },
            { label: "주택", value: "주택" },
            { label: "상가", value: "상가" },
          ],
          defaultValue: "아파트",
        }),
        status: fields.select({
          label: "상태",
          options: [
            { label: "거래가능", value: "live" },
            { label: "협의중", value: "talk" },
            { label: "거래완료", value: "done" },
          ],
          defaultValue: "live",
        }),
        x: fields.number({ label: "지도 X 좌표 (0~100)", defaultValue: 50 }),
        y: fields.number({ label: "지도 Y 좌표 (0~100)", defaultValue: 50 }),
        lat: fields.number({ label: "위도 (예: 37.5393)", defaultValue: 37.55 }),
        lng: fields.number({ label: "경도 (예: 127.0055)", defaultValue: 127.0 }),
        image: fields.image({
          label: "대표 사진",
          directory: "public/images",
          publicPath: "/images/",
          validation: { isRequired: true },
        }),
      },
    }),
  },
  singletons: {
    site: singleton({
      label: "사이트 설정",
      path: "content/site",
      format: { data: "yaml" },
      schema: {
        heroTitle: fields.text({
          label: "메인 헤드라인",
          defaultValue: "검증된 매물만 올립니다.",
        }),
        dealCount: fields.text({
          label: "누적 거래 표기",
          defaultValue: "1,842",
        }),
        disputeCount: fields.text({ label: "분쟁 표기", defaultValue: "0" }),
        responseMin: fields.text({
          label: "평균 응답 표기",
          defaultValue: "9분",
        }),
        email: fields.text({
          label: "대표 이메일",
          defaultValue: "desk@24estate.kr",
        }),
        phone: fields.text({ label: "전화", defaultValue: "02-511-0024" }),
        hours: fields.text({
          label: "운영",
          defaultValue: "24시간 · 연중무휴",
        }),
        address: fields.text({
          label: "사무소",
          defaultValue: "도산대로 462, 4층",
        }),
        license: fields.text({
          label: "등록",
          defaultValue: "중개사무소 제2026-0001호",
        }),
        insurance: fields.text({
          label: "공제",
          defaultValue: "부동산중개공제 가입",
        }),
      },
    }),
  },
});
