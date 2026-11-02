import { renderToBuffer, Font } from "@react-pdf/renderer";
import path from "node:path";
import { getListings, getSite } from "@/lib/content";
import { ListingPdf } from "@/lib/listing-pdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

Font.register({
  family: "Pretendard",
  fonts: [
    { src: path.join(process.cwd(), "public/fonts/Pretendard-Regular.otf") },
    {
      src: path.join(process.cwd(), "public/fonts/Pretendard-Bold.otf"),
      fontWeight: 700,
    },
  ],
});

function kstDate() {
  const d = new Date();
  const kst = new Date(d.getTime() + 9 * 3600 * 1000);
  const y = kst.getUTCFullYear();
  const m = String(kst.getUTCMonth() + 1).padStart(2, "0");
  const day = String(kst.getUTCDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

export async function GET(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;
    const [listings, site] = await Promise.all([getListings(), getSite()]);
    const listing = listings.find(
      (l) => l.id.toLowerCase() === decodeURIComponent(id).toLowerCase()
    );
    if (!listing) {
      return new Response("Listing not found", { status: 404 });
    }

    const doc = (
      <ListingPdf listing={listing} site={site} dateStr={kstDate()} />
    );
    const buffer = await renderToBuffer(doc);

    const download = new URL(req.url).searchParams.get("dl");
    const fname = `24estate_${listing.id}_${listing.name}.pdf`;
    const asciiName = `24estate_${listing.id}.pdf`;
    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${asciiName}"; filename*=UTF-8''${encodeURIComponent(fname)}`,
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    // 배포 환경 디버그: 원인 파악 후 일반 메시지로 교체 예정
    return new Response(`PDF_ERROR: ${String(e).slice(0, 600)}`, {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
