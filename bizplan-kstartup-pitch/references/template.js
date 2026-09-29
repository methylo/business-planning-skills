// template.js — K-Startup 피치덱 레이아웃 함수 뼈대 (L1 ~ L7)
// Usage: const pptxgen = require("pptxgenjs");
//        const { L1_Cover, L2_Divider, L3_Content, L4_Number, L5_Compare, L6_Team, L7_Closing } = require("./template");

const pptxgen = require("pptxgenjs");

// ==================== TOKENS ====================
const COLOR = {
  primary:   "1E3A8A",
  text:      "1F2937",
  muted:     "6B7280",
  bg_light:  "F3F4F6",
  border:    "D1D5DB",
  white:     "FFFFFF",
  accent_bg: "EEF2FF",
};

const FONT = "Noto Sans KR";
const SIZE = {
  title_cover: 54, title_section: 90, section_label: 28,
  title_content: 32, subtitle: 20,
  body_light: 18, body_heavy: 15,
  number_large: 60, table_head: 14, table_body: 13,
  caption: 12, footer: 10,
};

// ==================== MASTER ====================
function applyMaster(pres) {
  pres.defineSlideMaster({
    title: "KSTARTUP_MASTER",
    background: { color: COLOR.white },
    objects: [
      { rect: { x: 13.27, y: 0, w: 0.06, h: 7.5, fill: { color: COLOR.primary } } },
    ],
    slideNumber: { x: 12.6, y: 0.15, w: 0.4, h: 0.3, fontFace: FONT, fontSize: SIZE.footer, color: COLOR.muted, align: "right" },
  });
}

// ==================== L1 COVER ====================
function L1_Cover(pres, { title, subtitle, team, date, notice }) {
  const s = pres.addSlide();
  s.addText(title,    { x: 0.5, y: 2.6, w: 12.3, h: 1.4, fontFace: FONT, fontSize: SIZE.title_cover, bold: true, color: COLOR.primary, align: "center" });
  s.addText(subtitle, { x: 0.5, y: 4.1, w: 12.3, h: 0.6, fontFace: FONT, fontSize: 24, color: COLOR.text, align: "center" });
  s.addShape(pres.ShapeType.line, { x: 5.0, y: 5.0, w: 3.3, h: 0, line: { color: COLOR.border, width: 1 } });
  s.addText(team,  { x: 0.5, y: 5.5, w: 12.3, h: 0.5, fontFace: FONT, fontSize: 18, color: COLOR.text, align: "center" });
  s.addText(date,  { x: 0.5, y: 6.1, w: 12.3, h: 0.4, fontFace: FONT, fontSize: 14, color: COLOR.muted, align: "center" });
  s.addText(notice || "", { x: 0.5, y: 6.8, w: 12.3, h: 0.3, fontFace: FONT, fontSize: SIZE.footer, color: COLOR.muted, align: "center" });
  return s;
}

// ==================== L2 SECTION DIVIDER ====================
function L2_Divider(pres, { number, labelEn, labelKo, oneLiner }) {
  const s = pres.addSlide({ masterName: "KSTARTUP_MASTER" });
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 4.5, h: 7.5, fill: { color: COLOR.primary }, line: { color: COLOR.primary } });
  s.addText(number,  { x: 0.8, y: 2.0, w: 2.9, h: 2.5, fontFace: FONT, fontSize: SIZE.title_section, bold: true, color: COLOR.white });
  s.addText(labelEn, { x: 0.8, y: 4.5, w: 2.9, h: 0.8, fontFace: FONT, fontSize: SIZE.section_label, bold: true, color: COLOR.white });
  s.addText(labelKo, { x: 5.2, y: 3.0, w: 7.6, h: 1.0, fontFace: FONT, fontSize: 36, bold: true, color: COLOR.primary });
  s.addText(oneLiner || "", { x: 5.2, y: 4.2, w: 7.6, h: 0.6, fontFace: FONT, fontSize: 20, color: COLOR.muted });
  return s;
}

// ==================== L3 CONTENT TEXT ====================
function L3_Content(pres, { title, subtitle, bullets }) {
  const s = pres.addSlide({ masterName: "KSTARTUP_MASTER" });
  s.addText(title,    { x: 0.5, y: 0.5, w: 12.3, h: 0.8, fontFace: FONT, fontSize: SIZE.title_content, bold: true, color: COLOR.primary });
  if (subtitle) s.addText(subtitle, { x: 0.5, y: 1.4, w: 12.3, h: 0.5, fontFace: FONT, fontSize: SIZE.subtitle, color: COLOR.muted });
  s.addShape(pres.ShapeType.line, { x: 0.5, y: 2.0, w: 12.3, h: 0, line: { color: COLOR.border, width: 1 } });

  const lines = (bullets || []).slice(0, 5).map(t => ({
    text: t,
    options: { bullet: { code: "25CF" }, color: COLOR.text },
  }));
  s.addText(lines, { x: 0.5, y: 2.4, w: 12.3, h: 4.4, fontFace: FONT, fontSize: SIZE.body_light, lineSpacingMultiple: 1.5 });
  return s;
}

// ==================== L4 NUMBER HIGHLIGHT ====================
function L4_Number(pres, { title, number, unit, description, source }) {
  const s = pres.addSlide({ masterName: "KSTARTUP_MASTER" });
  s.addText(title, { x: 0.5, y: 0.5, w: 12.3, h: 0.8, fontFace: FONT, fontSize: SIZE.title_content, bold: true, color: COLOR.primary });
  s.addShape(pres.ShapeType.line, { x: 0.5, y: 1.5, w: 12.3, h: 0, line: { color: COLOR.border, width: 1 } });

  s.addText(number, { x: 0.5, y: 2.5, w: 6.5, h: 2.5, fontFace: FONT, fontSize: SIZE.number_large, bold: true, color: COLOR.primary });
  s.addText(unit,   { x: 0.5, y: 5.1, w: 6.5, h: 0.5, fontFace: FONT, fontSize: 18, color: COLOR.muted });

  s.addShape(pres.ShapeType.rect, { x: 7.5, y: 2.5, w: 5.3, h: 3.5, fill: { color: COLOR.bg_light }, line: { color: COLOR.bg_light } });
  s.addText(description, { x: 7.8, y: 2.8, w: 4.7, h: 2.9, fontFace: FONT, fontSize: SIZE.body_light, color: COLOR.text, lineSpacingMultiple: 1.5 });

  if (source) s.addText(`출처: ${source}`, { x: 0.5, y: 6.8, w: 12.3, h: 0.3, fontFace: FONT, fontSize: SIZE.caption, color: COLOR.muted });
  return s;
}

// ==================== L5 COMPARE TABLE ====================
function L5_Compare(pres, { title, header, rows, highlightRow, caption }) {
  // header: [label, col1, col2, ...]
  // rows: [[rowLabel, v1, v2, ...], ...]
  // highlightRow: index of 자사 row (0-based in rows)
  const s = pres.addSlide({ masterName: "KSTARTUP_MASTER" });
  s.addText(title, { x: 0.5, y: 0.5, w: 12.3, h: 0.8, fontFace: FONT, fontSize: SIZE.title_content, bold: true, color: COLOR.primary });

  const tableRows = [];
  tableRows.push(header.map(h => ({ text: h, options: { bold: true, fill: { color: COLOR.bg_light }, color: COLOR.text, fontFace: FONT, fontSize: SIZE.table_head, align: "center" } })));
  rows.forEach((r, idx) => {
    const isHi = idx === highlightRow;
    tableRows.push(r.map(c => ({
      text: c,
      options: {
        fill: { color: isHi ? COLOR.primary : COLOR.white },
        color: isHi ? COLOR.white : COLOR.text,
        fontFace: FONT, fontSize: SIZE.table_body,
        bold: isHi, align: "center",
      },
    })));
  });

  s.addTable(tableRows, { x: 0.5, y: 1.8, w: 12.3, h: 4.8, border: { type: "solid", pt: 0.5, color: COLOR.border }, rowH: (4.8 / tableRows.length) });
  if (caption) s.addText(caption, { x: 0.5, y: 6.8, w: 12.3, h: 0.3, fontFace: FONT, fontSize: SIZE.caption, color: COLOR.muted });
  return s;
}

// ==================== L6 TEAM CARDS ====================
function L6_Team(pres, { title, members }) {
  // members: [{ name, role, career }]  (2~4개)
  const s = pres.addSlide({ masterName: "KSTARTUP_MASTER" });
  s.addText(title, { x: 0.5, y: 0.5, w: 12.3, h: 0.8, fontFace: FONT, fontSize: SIZE.title_content, bold: true, color: COLOR.primary });

  const GRIDS = {
    2: [{ x: 2.0, w: 4.3 }, { x: 7.0, w: 4.3 }],
    3: [{ x: 0.7, w: 3.9 }, { x: 4.7, w: 3.9 }, { x: 8.7, w: 3.9 }],
    4: [{ x: 0.5, w: 3.0 }, { x: 3.7, w: 3.0 }, { x: 6.9, w: 3.0 }, { x: 10.1, w: 3.0 }],
  };
  const g = GRIDS[members.length] || GRIDS[4];

  members.slice(0, 4).forEach((m, i) => {
    const { x, w } = g[i];
    // 사진 원
    s.addShape(pres.ShapeType.oval, { x: x + w / 2 - 0.7, y: 1.9, w: 1.4, h: 1.4, fill: { color: COLOR.bg_light }, line: { color: COLOR.border, width: 1 } });
    s.addText(m.name,   { x, y: 4.0, w, h: 0.5, fontFace: FONT, fontSize: 20, bold: true, color: COLOR.primary, align: "center" });
    s.addText(m.role,   { x, y: 4.5, w, h: 0.4, fontFace: FONT, fontSize: 15, color: COLOR.text, align: "center" });
    s.addText(m.career, { x, y: 4.9, w, h: 1.5, fontFace: FONT, fontSize: 13, color: COLOR.muted, align: "center", lineSpacingMultiple: 1.4 });
  });
  return s;
}

// ==================== L7 CLOSING ====================
function L7_Closing(pres, { vision, contactLabel, contact, thanks }) {
  const s = pres.addSlide();
  s.addText(vision,       { x: 0.5, y: 2.0, w: 12.3, h: 2.0, fontFace: FONT, fontSize: 40, bold: true, color: COLOR.primary, align: "center" });
  s.addShape(pres.ShapeType.line, { x: 5.5, y: 4.5, w: 2.3, h: 0, line: { color: COLOR.border, width: 1 } });
  s.addText(contactLabel || "Contact", { x: 0.5, y: 5.0, w: 12.3, h: 0.4, fontFace: FONT, fontSize: 14, color: COLOR.muted, align: "center" });
  s.addText(contact,      { x: 0.5, y: 5.5, w: 12.3, h: 0.5, fontFace: FONT, fontSize: 18, color: COLOR.text, align: "center" });
  s.addText(thanks || "Thank you", { x: 0.5, y: 6.5, w: 12.3, h: 0.5, fontFace: FONT, fontSize: 24, bold: true, color: COLOR.primary, align: "center" });
  return s;
}

// ==================== EXPORT ====================
module.exports = {
  COLOR, FONT, SIZE,
  applyMaster,
  L1_Cover, L2_Divider, L3_Content, L4_Number, L5_Compare, L6_Team, L7_Closing,
};

// ==================== 최소 실행 예시 ====================
// const pres = new pptxgen();
// pres.layout = "LAYOUT_WIDE";  // 13.333 × 7.5
// applyMaster(pres);
// L1_Cover(pres, { title: "서비스명", subtitle: "한 줄 정의", team: "팀명", date: "2026.04.24", notice: "공고명" });
// L2_Divider(pres, { number: "01", labelEn: "Problem", labelKo: "문제 정의", oneLiner: "해결해야 하는 문제" });
// L3_Content(pres, { title: "문제 정의", subtitle: "타깃이 겪는 불편", bullets: ["항목 1", "항목 2", "항목 3"] });
// pres.writeFile({ fileName: "pitch.pptx" });
