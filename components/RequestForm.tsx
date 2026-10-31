"use client";

import { useState } from "react";

type Lang = "ko" | "en";

const T = {
  ko: {
    back: "← 메인으로",
    label: "REQUEST — 매물 알림 등록",
    h1: "원하는 조건을 등록하세요",
    promise: "조건에 맞는 매물이 들어오면, 연락 채널로 가장 먼저 보내드립니다.",
    g1: "거래 방식",
    g2: "지역",
    g3: "유형",
    g4: "예산",
    g5: "전용면적",
    g6: "희망 조건",
    g7: "연락 채널",
    trades: ["매매", "전세", "월세"],
    min: "최소",
    max: "최대",
    area: "기준",
    areas: ["강남", "서초", "송파", "성수", "연희", "마포"],
    areaEtc: "기타 지역 직접 입력",
    types: ["아파트", "오피스텔", "주택", "상가"],
    opt: "OPTIONAL",
    floor: "층수",
    floors: ["무관", "저층", "중층", "고층"],
    dir: "방위",
    dirs: ["무관", "남향", "남서향", "동향"],
    areaOpts: ["무관", "59㎡ 이하", "59–84㎡", "84–135㎡", "135㎡ 이상"],
    channels: ["카카오톡", "문자", "전화"],
    phone: "카카오톡 ID 또는 전화번호",
    go: "조건 등록하기",
    pv: "등록 정보는 매물 매칭 목적으로만 사용됩니다.",
    e1: "지역을 1개 이상 선택하세요",
    e2: "유형을 1개 이상 선택하세요",
    e3: "연락처를 입력하세요",
    doneLabel: "RECEIVED",
    doneT: "접수 완료",
    doneS: "조건에 맞는 매물이 들어오면 가장 먼저 보내드립니다.",
    doneB: "← 메인으로",
    foot: "© 2026 24부동산",
    footTel: "02-511-0024 · 24H",
  },
  en: {
    back: "← Main",
    label: "REQUEST — LISTING ALERTS",
    h1: "Register what you are looking for",
    promise:
      "When a matching home arrives, you hear it first — on your channel.",
    g1: "Deal Type",
    g2: "District",
    g3: "Property Type",
    g4: "Budget",
    g5: "Net Area",
    g6: "Preferences",
    g7: "Contact Channel",
    trades: ["Sale", "Jeonse", "Monthly"],
    min: "Min",
    max: "Max",
    area: "Size",
    areas: ["강남", "서초", "송파", "성수", "연희", "마포"],
    areaEtc: "Other district",
    types: ["Apartment", "Officetel", "House", "Retail"],
    opt: "OPTIONAL",
    floor: "Floor",
    floors: ["Any", "Low", "Mid", "High"],
    dir: "Facing",
    dirs: ["Any", "South", "South-West", "East"],
    areaOpts: ["Any", "≤ 59㎡", "59–84㎡", "84–135㎡", "135㎡+"],
    channels: ["KakaoTalk", "Text", "Call"],
    phone: "KakaoTalk ID or phone number",
    go: "Register Criteria",
    pv: "Your details are used only for listing matches.",
    e1: "Pick at least one district",
    e2: "Pick at least one type",
    e3: "Enter your contact",
    doneLabel: "RECEIVED",
    doneT: "Received",
    doneS: "When a matching home arrives, you hear it first.",
    doneB: "← Main",
    foot: "© 2026 24 Estate",
    footTel: "02-511-0024 · 24H",
  },
} as const;

const BUDGET: Record<string, string[]> = {
  "매매": ["무관", "~5억", "5–10억", "10–20억", "20–40억", "40억+"],
  "전세": ["무관", "~3억", "3–5억", "5–10억", "10–20억", "20억+"],
  "월세": ["무관", "~1천만", "1–3천만", "3–5천만", "5천만–1억", "1억+"],
};

export default function RequestForm() {
  const [lang, setLang] = useState<Lang>("ko");
  const t = T[lang];

  const [tradeIdx, setTradeIdx] = useState(0);
  const [bMin, setBMin] = useState(0);
  const [bMax, setBMax] = useState(BUDGET["매매"].length - 1);
  const [areas, setAreas] = useState<number[]>([]);
  const [areaEtc, setAreaEtc] = useState("");
  const [types, setTypes] = useState<number[]>([]);
  const [areaSel, setAreaSel] = useState(0);
  const [floorSel, setFloorSel] = useState(0);
  const [dirSel, setDirSel] = useState(0);
  const [channel, setChannel] = useState(0);
  const [phone, setPhone] = useState("");
  const [errs, setErrs] = useState<{ area: boolean; type: boolean; phone: boolean }>({
    area: false,
    type: false,
    phone: false,
  });
  const [echo, setEcho] = useState<string | null>(null);

  const budget = BUDGET[T.ko.trades[tradeIdx]];

  const toggle = (arr: number[], i: number) =>
    arr.includes(i) ? arr.filter((x) => x !== i) : [...arr, i];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const areaOk = areas.length > 0 || areaEtc.trim().length > 0;
    const typeOk = types.length > 0;
    const phoneOk = phone.trim().length > 0;
    setErrs({ area: !areaOk, type: !typeOk, phone: !phoneOk });
    if (!areaOk || !typeOk || !phoneOk) return;
    const regionAll = [
      ...areas.map((i) => t.areas[i]),
      ...(areaEtc.trim() ? [areaEtc.trim()] : []),
    ].join(", ");
    const sel = [
      regionAll,
      types.map((i) => t.types[i]).join("/"),
      `${t.trades[tradeIdx]} ${budget[bMin]}~${budget[bMax]}`,
    ].join(" · ");
    setEcho(sel);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const changeTrade = (i: number) => {
    setTradeIdx(i);
    setBMin(0);
    setBMax(BUDGET[T.ko.trades[i]].length - 1);
  };

  return (
    <>
      <header className="site-header">
        <div className="wrap" style={{ display: "flex", alignItems: "center" }}>
          <a className="logo" href="/">24</a>
          <div className="head-right">
            <a className="nl" href="/">{t.back}</a>
            <div className="lang">
              <button className={lang === "ko" ? "on" : ""} onClick={() => setLang("ko")}>KR</button>
              <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
            </div>
          </div>
        </div>
      </header>

      <main className="form-wrap">
        {!echo ? (
          <>
            <div className="form-head">
              <span className="mono">{t.label}</span>
              <h1>{t.h1}</h1>
              <p className="promise">{t.promise}</p>
            </div>

            <form onSubmit={submit} noValidate>
              <div className="grp">
                <div className="grp-head">
                  <span className="gno">01</span>
                  <h3>{t.g1}</h3>
                </div>
                <div className="seg">
                  {t.trades.map((label, i) => (
                    <button
                      key={label}
                      type="button"
                      className={tradeIdx === i ? "on" : ""}
                      onClick={() => changeTrade(i)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={"grp" + (errs.area ? " err" : "")}>
                <div className="grp-head">
                  <span className="gno">02</span>
                  <h3>{t.g2}</h3>
                </div>
                <div className="chips">
                  {t.areas.map((a, i) => (
                    <button
                      key={a}
                      type="button"
                      className={"chip" + (areas.includes(i) ? " on" : "")}
                      onClick={() => setAreas(toggle(areas, i))}
                    >
                      {a}
                    </button>
                  ))}
                </div>
                <input
                  className="tinput etc"
                  value={areaEtc}
                  onChange={(e) => setAreaEtc(e.target.value)}
                  placeholder={t.areaEtc}
                />
                <p className="emsg">{t.e1}</p>
              </div>

              <div className={"grp" + (errs.type ? " err" : "")}>
                <div className="grp-head">
                  <span className="gno">03</span>
                  <h3>{t.g3}</h3>
                </div>
                <div className="chips">
                  {t.types.map((label, i) => (
                    <button
                      key={label}
                      type="button"
                      className={"chip" + (types.includes(i) ? " on" : "")}
                      onClick={() => setTypes(toggle(types, i))}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <p className="emsg">{t.e2}</p>
              </div>

              <div className="grp">
                <div className="grp-head">
                  <span className="gno">04</span>
                  <h3>{t.g4}</h3>
                </div>
                <div className="selrow">
                  <div className="selwrap">
                    <span>{t.min}</span>
                    <select value={bMin} onChange={(e) => setBMin(+e.target.value)}>
                      {budget.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="selwrap">
                    <span>{t.max}</span>
                    <select value={bMax} onChange={(e) => setBMax(+e.target.value)}>
                      {budget.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grp">
                <div className="grp-head">
                  <span className="gno">05</span>
                  <h3>{t.g5}</h3>
                </div>
                <div className="selrow">
                  <div className="selwrap">
                    <span>{t.area}</span>
                    <select value={areaSel} onChange={(e) => setAreaSel(+e.target.value)}>
                      {t.areaOpts.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grp">
                <div className="grp-head">
                  <span className="gno">06</span>
                  <h3>{t.g6}</h3>
                  <span className="opt">{t.opt}</span>
                </div>
                <div className="selrow">
                  <div className="selwrap">
                    <span>{t.floor}</span>
                    <select value={floorSel} onChange={(e) => setFloorSel(+e.target.value)}>
                      {t.floors.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="selwrap">
                    <span>{t.dir}</span>
                    <select value={dirSel} onChange={(e) => setDirSel(+e.target.value)}>
                      {t.dirs.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className={"grp" + (errs.phone ? " err" : "")}>
                <div className="grp-head">
                  <span className="gno">07</span>
                  <h3>{t.g7}</h3>
                </div>
                <div className="chips">
                  {t.channels.map((label, i) => (
                    <button
                      key={label}
                      type="button"
                      className={"chip" + (channel === i ? " on" : "")}
                      onClick={() => setChannel(i)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <input
                  className="tinput etc"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t.phone}
                />
                <p className="emsg">{t.e3}</p>
              </div>

              <div className="submit">
                <button className="go" type="submit">{t.go}</button>
                <p className="privacy mono">{t.pv}</p>
              </div>
            </form>
          </>
        ) : (
          <section className="done-box">
            <svg viewBox="0 0 80 80" fill="none" stroke="#2e6e4e" strokeWidth="2.4" strokeLinecap="round">
              <circle cx="40" cy="40" r="36" />
              <path d="M25 41.5 35.5 52 55 30" />
            </svg>
            <div className="mono">{t.doneLabel}</div>
            <h2>{t.doneT}</h2>
            <div className="echo">{echo}</div>
            <p className="promise">{t.doneS}</p>
            <a className="back" href="/">{t.doneB}</a>
          </section>
        )}
      </main>

      <footer className="site-footer">
        <div className="wrap">
          <span className="mono">{t.foot}</span>
          <span className="mono">{t.footTel}</span>
        </div>
      </footer>
    </>
  );
}
