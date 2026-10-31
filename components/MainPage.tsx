"use client";

import { useEffect, useRef, useState } from "react";
import { STATUS_LABEL } from "@/lib/listings";
import type { CMSListing, SiteContent } from "@/lib/content";

type Lang = "ko" | "en";

const T = {
  ko: {
    nav1: "지도",
    nav2: "인덱스",
    nav3: "문의",
    cta: "매물 알림 등록",
    h1en: null,
    f1: "거래",
    f2: "분쟁",
    f3: "응답",
    heroCta: "원하는 조건 등록 →",
    mT: "매물 지도",
    mH: "핀을 눌러 상세 확인",
    legend: "SEOUL — 강남 · 서초 · 성수 · 연희",
    s1: "전용면적",
    s2: "층 / 형태",
    s3: "방위",
    s4: "입주",
    s5: "4중 문서 검증 완료",
    s6: "이 매물 상담 문의",
    gT: "최근 거래",
    gH: "2025 — 2026",
    gallery: [
      { cap: "한남", price: "매매 62억", img: "/img/luxury-pool.jpg" },
      { cap: "청담", price: "전세 25억", img: "/img/glass-facade.jpg" },
      { cap: "연희", price: "매매 23억", img: "/img/house-dusk.jpg" },
      { cap: "성수", price: "전세 9억", img: "/img/int-loft.jpg" },
    ],
    idxT: "인덱스 — 2026.10",
    th1: "No",
    th2: "위치",
    th3: "전용",
    th4: "금액",
    th5: "상태",
    pT: "4중 검증",
    pH: "4-CHECK",
    checks: ["등기부 등본", "감정가 대조", "관리비 3개년", "개발 계획 확인"],
    bT: "매물 알림",
    bS: "조건에 맞는 매물이 들어오면 가장 먼저 보내드립니다.",
    bBtn: "조건 등록하기 →",
    cLabel: "CONTACT",
    o1: "전화",
    o2: "운영",
    o3: "사무소",
    o4: "등록",
    o5: "공제",
    h1enFallback: "Verified before listed.",
    foot: "© 2026 24부동산 · Hero photo: Unsplash",
    capLoc: "SEOUL — GANGNAM",
  },
  en: {
    nav1: "Map",
    nav2: "Index",
    nav3: "Contact",
    cta: "Listing Alerts",
    h1en: "Verified before listed.",
    f1: "Deals",
    f2: "Disputes",
    f3: "Response",
    heroCta: "Register your criteria →",
    mT: "Listings Map",
    mH: "Tap a pin for details",
    legend: "SEOUL — Gangnam · Seocho · Seongsu · Yeonhui",
    s1: "Net Area",
    s2: "Floor / Type",
    s3: "Facing",
    s4: "Move-in",
    s5: "4-document check passed",
    s6: "Ask about this listing",
    gT: "Recent Closings",
    gH: "2025 — 2026",
    gallery: [
      { cap: "Hannam", price: "Sale ₩6.2B", img: "/img/luxury-pool.jpg" },
      { cap: "Cheongdam", price: "Jeonse ₩2.5B", img: "/img/glass-facade.jpg" },
      { cap: "Yeonhui", price: "Sale ₩2.3B", img: "/img/house-dusk.jpg" },
      { cap: "Seongsu", price: "Jeonse ₩900M", img: "/img/int-loft.jpg" },
    ],
    idxT: "Index — Oct 2026",
    th1: "No",
    th2: "District",
    th3: "Area",
    th4: "Price",
    th5: "Status",
    pT: "Four Checks",
    pH: "4-CHECK",
    checks: [
      "Registry Copy",
      "Appraisal Match",
      "Dues · 3 Years",
      "Development Plans",
    ],
    bT: "Listing Alerts",
    bS: "When a matching home arrives, you hear it first.",
    bBtn: "Register Criteria →",
    cLabel: "CONTACT",
    o1: "Phone",
    o2: "Hours",
    o3: "Office",
    o4: "License",
    o5: "Insured",
    h1enFallback: "Verified before listed.",
    foot: "© 2026 24 Estate · Hero photo: Unsplash",
    capLoc: "SEOUL — GANGNAM",
  },
} as const;

const ICONS = [
  <svg key="i0" viewBox="0 0 32 32" fill="none" stroke="currentColor">
    <path d="M8 3h12l4 4v22H8z" />
    <path d="M20 3v4h4" />
    <path d="M12 14h8M12 18h8" />
    <circle cx="12.5" cy="24" r="1.6" />
  </svg>,
  <svg key="i1" viewBox="0 0 32 32" fill="none" stroke="currentColor">
    <path d="M5 29V4" />
    <path d="M5 29h24" />
    <path d="M9 22l5-6 4 3 6-8" />
  </svg>,
  <svg key="i2" viewBox="0 0 32 32" fill="none" stroke="currentColor">
    <path d="M8 4h16v25l-2.7-1.8L18.6 29l-2.6-1.8L13.4 29l-2.7-1.8L8 29z" />
    <path d="M12 11h8M12 15.5h8M12 20h5" />
  </svg>,
  <svg key="i3" viewBox="0 0 32 32" fill="none" stroke="currentColor">
    <rect x="5" y="5" width="22" height="22" />
    <path d="M5 14h22M14 5v22" />
    <circle cx="20.5" cy="19.5" r="2.2" />
  </svg>,
];

export default function MainPage({
  listings,
  site,
}: {
  listings: CMSListing[];
  site: SiteContent;
}) {
  const [lang, setLang] = useState<Lang>("ko");
  const t = T[lang];
  const [openId, setOpenId] = useState<string | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLSpanElement>(null);
  const mapRef = useRef<HTMLElement>(null);

  // DDP 시간대 그레이딩 (?t=시간 으로 강제 미리보기)
  useEffect(() => {
    const qp = new URLSearchParams(window.location.search).get("t");
    const hr = qp !== null ? ((+qp) % 24 + 24) % 24 : new Date().getHours();
    const mm =
      qp !== null ? "00" : String(new Date().getMinutes()).padStart(2, "0");
    let cls: string, label: string;
    if (hr >= 5 && hr < 7) { cls = "dawn"; label = "DAWN"; }
    else if (hr >= 7 && hr < 16) { cls = "day"; label = "DAY"; }
    else if (hr >= 16 && hr < 18) { cls = "golden"; label = "GOLDEN"; }
    else if (hr >= 18 && hr < 20) { cls = "dusk"; label = "DUSK"; }
    else { cls = "night"; label = "NIGHT"; }
    stageRef.current?.classList.add("ph-" + cls);
    if (chipRef.current) {
      chipRef.current.textContent = `DDP SEOUL — ${String(hr).padStart(2, "0")}:${mm} KST · ${label}`;
    }
  }, []);

  // 스크롤 리빌
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    const rows = document.querySelectorAll("tbody tr");
    const rio = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) {
          const i = Array.from(rows).indexOf(e.target as HTMLElement);
          setTimeout(() => e.target.classList.add("in"), i * 90);
          rio.unobserve(e.target);
        }
      }),
      { threshold: 0.1 }
    );
    rows.forEach((r) => rio.observe(r));
    const onScroll = () => {
      const h = document.documentElement;
      const p = document.getElementById("progress");
      if (p) p.style.width = (scrollY / (h.scrollHeight - innerHeight)) * 100 + "%";
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); rio.disconnect(); removeEventListener("scroll", onScroll); };
  }, []);

  const openPanel = (id: string) => setOpenId(id);
  const closePanel = () => setOpenId(null);
  const openFromTable = (id: string) => {
    mapRef.current?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => setOpenId(id), 650);
  };
  const open = listings.find((L) => L.id === openId) || null;

  return (
    <>
      <div id="progress" />

      <header className="site-header">
        <div className="wrap" style={{ display: "flex", alignItems: "center" }}>
          <a className="logo" href="#">24</a>
          <div className="head-right">
            <a className="nl" href="#map">{t.nav1}</a>
            <a className="nl" href="#idx">{t.nav2}</a>
            <a className="nl" href="#contact">{t.nav3}</a>
            <div className="lang">
              <button className={lang === "ko" ? "on" : ""} onClick={() => setLang("ko")}>KR</button>
              <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
            </div>
            <a className="head-cta" href="/request">{t.cta}</a>
          </div>
        </div>
      </header>

      {/* HERO : DDP + 시간대 그레이딩 */}
      <section className="wrap hero">
        <div className="hero-stage" ref={stageRef}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/ddp-day.jpg" alt="동대문디자인플라자(DDP) 전경 — Unsplash" />
          <div className="hero-grade" />
        </div>
        <div className="hero-cap">
          <span className="mono" ref={chipRef}>DDP SEOUL</span>
          <span className="mono">DONGDAEMUN DESIGN PLAZA · ZAHA HADID, 2014</span>
        </div>
        <div className="hero-row">
          <h1 className="rv">{lang === "ko" ? site.heroTitle : t.h1en}</h1>
          <div className="hero-right rv">
            <div className="facts">
              <div><b>{site.dealCount}</b><span>{t.f1}</span></div>
              <div><b>{site.disputeCount}</b><span>{t.f2}</span></div>
              <div><b>{site.responseMin}</b><span>{t.f3}</span></div>
            </div>
            <a className="hero-cta" href="/request">{t.heroCta}</a>
          </div>
        </div>
      </section>

      {/* INTERACTIVE MAP */}
      <section className="wrap map-sec" id="map" ref={mapRef}>
        <div className="slabel rv">
          <h2>{t.mT}</h2>
          <span className="hint">{t.mH}</span>
        </div>
        <div
          className="map-box rv"
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (!target.closest(".m-panel") && !target.closest(".pin")) closePanel();
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/aerial-city.jpg" alt="" />
          <div className="map-legend">{t.legend}</div>
          {listings.map((L) => (
            <div
              key={L.id}
              className={"pin" + (L.status === "done" ? " done" : "") + (openId === L.id ? " sel" : "")}
              style={{ left: L.x + "%", top: L.y + "%" }}
              onClick={(e) => { e.stopPropagation(); openPanel(L.id); }}
            >
              <span className="tip">{`${L.id} ${L.name} · ${L.price}`}</span>
            </div>
          ))}
          <aside className={"m-panel" + (open ? " open" : "")}>
            <div className="mp-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={open ? open.img : listings[0]?.img ?? "/images/luxury-pool.jpg"} alt="" />
              <button className="mp-close" onClick={closePanel} aria-label="close">✕</button>
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
      </section>

      {/* GALLERY */}
      <section className="wrap gallery" id="work">
        <div className="slabel rv">
          <h2>{t.gT}</h2>
          <span className="mono">{t.gH}</span>
        </div>
        {[t.gallery.slice(0, 2), t.gallery.slice(2, 4)].map((pair, ri) => (
          <div key={ri} className={"g-row" + (ri === 1 ? " rev" : "")}>
            {pair.map((g, gi) => (
              <div key={gi} className="g-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.img} alt="" />
                <span className="g-cap">{g.cap} <i>{g.price}</i></span>
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* INDEX TABLE */}
      <section className="wrap idx" id="idx">
        <div className="idx-head rv">
          <h2>{t.idxT}</h2>
          <span className="mono">UPD 10.29</span>
        </div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>{t.th1}</th>
              <th>{t.th2}</th>
              <th>{t.th3}</th>
              <th>{t.th4}</th>
              <th>{t.th5}</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((L) => (
              <tr key={L.id} onClick={() => openFromTable(L.id)}>
                <td className="thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={L.img} alt="" />
                </td>
                <td className="no">{L.id}</td>
                <td className="name">{L.name}</td>
                <td className="area">{L.area}</td>
                <td className="price">{L.price}</td>
                <td>
                  <span className={"st " + STATUS_LABEL[L.status].cls}>
                    {STATUS_LABEL[L.status][lang]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 4 CHECKS */}
      <section className="wrap proc" id="proc">
        <div className="slabel rv">
          <h2>{t.pT}</h2>
          <span className="mono">{t.pH}</span>
        </div>
        <div className="proc-grid rv">
          {t.checks.map((label, i) => (
            <div key={i} className="proc-item">
              <div className="pno">0{i + 1}</div>
              {ICONS[i]}
              <h4>{label}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* MATCHING BAND */}
      <section className="wrap band" id="match">
        <div className="band-in rv">
          <div>
            <div className="mono">MATCHING</div>
            <h2>{t.bT}</h2>
            <p className="sub">{t.bS}</p>
          </div>
          <a className="band-btn" href="/request">{t.bBtn}</a>
        </div>
      </section>

      {/* OFFICE */}
      <section className="wrap office" id="contact">
        <div className="o-grid">
          <div className="o-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/arch-min.jpg" alt="" />
          </div>
          <div className="o-right">
            <div className="mono rv">{t.cLabel}</div>
            <a className="mail rv" href="#">{site.email}</a>
            <div className="o-meta rv">
              <div><span>{t.o1}</span><b>{site.phone}</b></div>
              <div><span>{t.o2}</span><b>{site.hours}</b></div>
              <div><span>{t.o3}</span><b>{site.address}</b></div>
              <div><span>{t.o4}</span><b>{site.license}</b></div>
              <div><span>{t.o5}</span><b>{site.insurance}</b></div>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="wrap">
          <span className="mono">{t.foot}</span>
          <span className="mono">37.5665°N, 126.9780°E</span>
        </div>
      </footer>
    </>
  );
}
