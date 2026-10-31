"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
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
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // 지도 초기화 (1회)
  useEffect(() => {
    if (!divRef.current || mapRef.current) return;
    const map = L.map(divRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
      attributionControl: true,
    });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);
    map.setView([37.5663, 127.0376], 15); // 기준점: DDP
    map.on("click", () => onOpen(null));
    mapRef.current = map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 매물 마커 (데이터/언어 변경 시 재구성)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    const pts: [number, number][] = [];
    listings.forEach((Li) => {
      const ll: [number, number] = [Li.lat, Li.lng];
      pts.push(ll);
      const icon = L.divIcon({
        className:
          "estate-marker" + (Li.status === "done" ? " done" : "") + (openId === Li.id ? " sel" : ""),
        iconSize: [15, 15],
        iconAnchor: [7.5, 7.5],
        html: '<span class="dot"></span>',
      });
      const m = L.marker(ll, { icon, riseOnHover: true }).addTo(map);
      m.bindTooltip(`${Li.id} ${Li.name} · ${Li.price}`, {
        direction: "top",
        offset: [0, -10],
        className: "estate-tip",
      });
      m.on("click", (e) => {
        e.originalEvent.stopPropagation();
        onOpen(Li.id);
      });
      markersRef.current.push(m);
    });
    if (pts.length) {
      map.fitBounds(L.latLngBounds(pts).pad(0.25), { maxZoom: 14 });
    } else {
      map.setView([37.5663, 127.0376], 15); // 매물 없으면 DDP 기준
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listings, lang]);

  // 선택 매물로 플라이
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !openId) return;
    const Li = listings.find((x) => x.id === openId);
    if (!Li) return;
    map.flyTo([Li.lat, Li.lng], 14, { duration: 0.8 });
    markersRef.current.forEach((m, i) => {
      const el = m.getElement();
      if (el) el.classList.toggle("sel", listings[i]?.id === openId);
    });
  }, [openId, listings]);

  const open = listings.find((x) => x.id === openId) || null;

  return (
    <div className="map-box" id="mapBox">
      <div ref={divRef} className="leaflet-host" />
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
