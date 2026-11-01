"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import * as maplibregl from "maplibre-gl";
import { useEffect, useRef } from "react";
import { STATUS_LABEL } from "@/lib/listings";
import type { CMSListing } from "@/lib/content";

type Lang = "ko" | "en";

const T = {
  ko: {
    legend: "SEOUL — DDP · 동대문",
    s1: "전용면적",
    s2: "층 / 형태",
    s3: "방위",
    s4: "입주",
    s5: "4중 문서 검증 완료",
    s6: "이 매물 상담 문의",
  },
  en: {
    legend: "SEOUL — Dongdaemun Design Plaza",
    s1: "Net Area",
    s2: "Floor / Type",
    s3: "Facing",
    s4: "Move-in",
    s5: "4-document check passed",
    s6: "Ask about this listing",
  },
} as const;

// 기준점: DDP
const DDP: [number, number] = [127.0099, 37.56707];

// 라벨을 남길 도로 등급 — 큰 길만 (골목길·보행로 라벨은 제거)
const KEEP_ROAD_CLASSES = ["motorway", "trunk", "primary", "secondary", "tertiary"];

export default function ListingMap({
  listings,
  lang,
  openId,
  onOpen,
}: {
  listings: CMSListing[];
  lang: Lang;
  openId: string | null;
  onOpen: (id: string | null) => void;
}) {
  const t = T[lang];
  const divRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<{ id: string; el: HTMLElement; lnglat: [number, number] }[]>([]);

  // 지도 초기화 (1회) + 스타일 수술: 골목길 라벨·POI 라벨 제거
  useEffect(() => {
    if (!divRef.current || mapRef.current) return;
    const map = new maplibregl.Map({
      container: divRef.current,
      style: "https://tiles.openfreemap.org/styles/positron",
      center: DDP,
      zoom: 15.5,
      attributionControl: { compact: false },
    });
    mapRef.current = map;
    map.addControl(new maplibregl.AttributionControl({ compact: true }));
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }));

    map.on("error", (e) => {
      (window as unknown as Record<string, unknown>).__maplibreErr = String(e.error?.message || e.error || e);
    });
    (window as unknown as Record<string, unknown>).__ddpMap = map;
    map.on("load", () => {
      const style = map.getStyle();
      for (const layer of style.layers) {
        if (layer.type !== "symbol") continue;
        const sl = (layer as { "source-layer"?: string })["source-layer"];
        if (sl === "transportation_name") {
          // 작은 길(minor/service/track/path/pedestrian) 이름은 표시하지 않음
          const keepExpr = [
            "match",
            ["get", "class"],
            KEEP_ROAD_CLASSES,
            true,
            false,
          ] as unknown as maplibregl.FilterSpecification;
          const old = (layer as { filter?: maplibregl.FilterSpecification }).filter;
          map.setFilter(layer.id, (old ? (["all", old, keepExpr] as never) : keepExpr) as never);
        }
        if (sl === "poi") {
          // 가게·병원 등 POI 라벨/아이콘 제거
          map.removeLayer(layer.id);
        }
      }
    });

    // DDP 랜드마크 마커
    const ddpEl = document.createElement("div");
    ddpEl.className = "ddp-marker";
    ddpEl.innerHTML = '<span class="dot"></span>';
    const ddpPopup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 14,
      className: "estate-popup",
    }).setHTML("동대문디자인플라자 (DDP)");
    const ddpMarker = new maplibregl.Marker({ element: ddpEl })
      .setLngLat(DDP)
      .addTo(map);
    ddpEl.addEventListener("mouseenter", () => ddpPopup.addTo(map));
    ddpEl.addEventListener("mouseleave", () => ddpPopup.remove());

    // 배경 클릭 시 패널 닫기
    map.on("click", () => onOpen(null));

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 마커 (매물/언어 변경 시 재구성)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    markersRef.current.forEach((m) => m.el.remove());
    markersRef.current = [];
    const pts: [number, number][] = [];

    listings.forEach((Li) => {
      const lnglat: [number, number] = [Li.lng, Li.lat];
      pts.push(lnglat);
      const el = document.createElement("div");
      el.className =
        "estate-marker" + (Li.status === "done" ? " done" : "") + (openId === Li.id ? " sel" : "");
      el.innerHTML = '<span class="dot"></span>';
      const marker = new maplibregl.Marker({ element: el }).setLngLat(lnglat).addTo(map);
      const popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 12,
        className: "estate-popup",
      }).setHTML(`${Li.id} ${Li.name} · ${Li.price}`);
      el.addEventListener("mouseenter", () => popup.addTo(map));
      el.addEventListener("mouseleave", () => popup.remove());
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        onOpen(Li.id);
      });
      markersRef.current.push({ id: Li.id, el, lnglat });
    });

    if (pts.length) {
      const bounds = pts.reduce(
        (b, c) => b.extend(c),
        new maplibregl.LngLatBounds(pts[0], pts[0])
      );
      map.fitBounds(bounds, { padding: 90, maxZoom: 16, duration: 600 });
    } else {
      map.jumpTo({ center: DDP, zoom: 15.5 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listings, lang]);

  // 선택 매물 플라이 + 마커 강조
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !openId) return;
    const Li = listings.find((x) => x.id === openId);
    if (!Li) return;
    map.flyTo({ center: [Li.lng, Li.lat], zoom: 16, duration: 800 });
    markersRef.current.forEach((m) => m.el.classList.toggle("sel", m.id === openId));
  }, [openId, listings]);

  const open = listings.find((x) => x.id === openId) || null;

  return (
    <div className="map-box" id="mapBox">
      <div ref={divRef} className="map-host" />
      <div className="map-legend">{t.legend}</div>
      <aside className={"m-panel" + (open ? " open" : "")}>
        <div className="mp-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={open ? open.img : listings[0]?.img ?? "/images/luxury-pool.jpg"} alt="" />
          <button className="mp-close" onClick={() => onOpen(null)} aria-label="close">✕</button>
        </div>
        {open && (
          <div className="mp-body">
            <div className="mp-id">{open.id} — {open.district}</div>
            <div className="mp-name">{open.name}</div>
            <div>
              <span className="mp-price">{open.price}</span>
              <span className={"mp-status " + STATUS_LABEL[open.status].cls}>
                {STATUS_LABEL[open.status][lang]}
              </span>
            </div>
            <div className="mp-specs">
              <div><span>{t.s1}</span><b>{open.area}</b></div>
              <div><span>{t.s2}</span><b>{open.floor}</b></div>
              <div><span>{t.s3}</span><b>{open.dir}</b></div>
              <div><span>{t.s4}</span><b>{open.moveIn}</b></div>
            </div>
            <div className="mp-note">✓ <span>{t.s5}</span></div>
            <a className="mp-cta" href="#contact">{t.s6}</a>
          </div>
        )}
      </aside>
    </div>
  );
}
