import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import type { CMSListing, SiteContent } from "./content";

const STATUS: Record<string, { label: string; color: string }> = {
  live: { label: "거래가능", color: "#2e6e4e" },
  talk: { label: "협의중", color: "#8a6a1f" },
  done: { label: "거래완료", color: "#6d6d68" },
};

const S = StyleSheet.create({
  page: { paddingTop: 40, paddingHorizontal: 44, paddingBottom: 40, fontFamily: "Pretendard", backgroundColor: "#fbfbfa" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 18 },
  brandRow: { flexDirection: "row", alignItems: "center" },
  logo: { width: 26, height: 26, backgroundColor: "#141414", color: "#fff", fontSize: 12, textAlign: "center", paddingTop: 6, fontFamily: "Pretendard" },
  brandTxt: { marginLeft: 8, fontSize: 9, letterSpacing: 2, color: "#6d6d68" },
  pill: { fontSize: 10, color: "#141414", border: "1 solid #d9d9d4", borderRadius: 999, paddingVertical: 5, paddingHorizontal: 12 },
  img: { width: "100%", height: 300, objectFit: "cover", marginBottom: 22 },
  name: { fontSize: 24, fontFamily: "Pretendard", fontWeight: 700, color: "#141414", marginBottom: 4 },
  meta: { fontSize: 10.5, color: "#6d6d68", marginBottom: 16 },
  priceRow: { flexDirection: "row", alignItems: "baseline", marginBottom: 18 },
  price: { fontSize: 30, fontFamily: "Pretendard", fontWeight: 700, color: "#141414" },
  trade: { fontSize: 11, color: "#6d6d68", marginLeft: 10 },
  rule: { borderTop: "1 solid #e4e4e0", marginBottom: 0 },
  grid: { flexDirection: "row", flexWrap: "wrap" },
  cell: { width: "50%", paddingVertical: 12, borderBottom: "1 solid #e4e4e0" },
  cellOdd: { paddingRight: 14 },
  cellEven: { paddingLeft: 14 },
  cellLabel: { fontSize: 8.5, letterSpacing: 1.5, color: "#6d6d68", marginBottom: 3 },
  cellValue: { fontSize: 12.5, color: "#141414" },
  verify: { marginTop: 20, padding: 14, backgroundColor: "#eef2ef", borderRadius: 3, fontSize: 10.5, color: "#2e6e4e" },
  footer: { position: "absolute", bottom: 34, left: 44, right: 44, borderTop: "1 solid #e4e4e0", paddingTop: 12, flexDirection: "row", justifyContent: "space-between" },
  footTxt: { fontSize: 9, color: "#6d6d68" },
});

export function ListingPdf({
  listing,
  site,
  dateStr,
}: {
  listing: CMSListing;
  site: SiteContent;
  dateStr: string;
}) {
  const st = STATUS[listing.status] ?? STATUS.live;
  return (
    <Document
      title={`24부동산 매물 요약 — ${listing.name}`}
      author="24부동산"
    >
      <Page size="A4" style={S.page}>
        <View style={S.header} fixed>
          <View style={S.brandRow}>
            <Text style={S.logo}>24</Text>
            <Text style={S.brandTxt}>부동산 인덱스 — 매물 요약</Text>
          </View>
          <Text style={[S.pill, { color: st.color, borderColor: st.color }]}>
            {st.label}
          </Text>
        </View>

        <Image style={S.img} src={path(listing.img)} />

        <Text style={S.name}>{listing.name}</Text>
        <Text style={S.meta}>
          {listing.district} · {listing.type} · {listing.id}
        </Text>

        <View style={S.priceRow}>
          <Text style={S.price}>{listing.price}</Text>
          <Text style={S.trade}>{listing.trade}</Text>
        </View>

        <View style={S.rule} />
        <View style={S.grid}>
          <View style={[S.cell, S.cellOdd]}>
            <Text style={S.cellLabel}>전용면적</Text>
            <Text style={S.cellValue}>{listing.area}</Text>
          </View>
          <View style={[S.cell, S.cellEven]}>
            <Text style={S.cellLabel}>층 / 형태</Text>
            <Text style={S.cellValue}>{listing.floor}</Text>
          </View>
          <View style={[S.cell, S.cellOdd]}>
            <Text style={S.cellLabel}>방위</Text>
            <Text style={S.cellValue}>{listing.dir}</Text>
          </View>
          <View style={[S.cell, S.cellEven]}>
            <Text style={S.cellLabel}>입주</Text>
            <Text style={S.cellValue}>{listing.moveIn}</Text>
          </View>
        </View>

        <Text style={S.verify}>4중 문서 검증 완료 — 등기부 · 감정가 · 관리비 3개년 · 개발 계획</Text>

        <View style={S.footer} fixed>
          <Text style={S.footTxt}>
            {site.email} · {site.phone} · {site.address}
          </Text>
          <Text style={S.footTxt}>발행일 {dateStr}</Text>
        </View>
      </Page>
    </Document>
  );
}

function path(publicPath: string) {
  // '/images/xxx.jpg' → public 디렉터리의 실제 파일 경로
  return `./public${publicPath}`;
}
