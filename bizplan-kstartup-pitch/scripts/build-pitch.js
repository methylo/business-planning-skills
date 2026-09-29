#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const pptxgen = require('pptxgenjs');
const {
  applyMaster, L1_Cover, L2_Divider, L3_Content,
  L4_Number, L5_Compare, L6_Team, L7_Closing,
} = require('../references/template');

function text(value, name) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${name} must be a non-empty string`);
  }
  return value;
}

function scalar(value, name) {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  return text(value, name);
}

function array(value, name, minimum = 1, maximum = Infinity) {
  if (!Array.isArray(value) || value.length < minimum || value.length > maximum) {
    const range = Number.isFinite(maximum) ? `${minimum} to ${maximum}` : `at least ${minimum}`;
    throw new Error(`${name} must contain ${range} item(s)`);
  }
  return value;
}

function textArray(value, name, maximum = 5) {
  const items = array(value, name, 1, maximum);
  items.forEach((item, index) => {
    if (typeof item !== 'string' || item.trim() === '') {
      throw new Error(`${name}[${index}] must be a non-empty string`);
    }
  });
  return items;
}

function object(value, name) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`Missing required input: ${name}`);
  }
  return value;
}

function metric(value, name) {
  object(value, name);
  scalar(value.number, `${name}.number`);
  for (const key of ['unit', 'description', 'source']) text(value[key], `${name}.${key}`);
}

function table(value, name) {
  object(value, name);
  const header = textArray(value.header, `${name}.header`, 5);
  if (header.length < 2) throw new Error(`${name}.header must contain 2 to 5 columns`);
  const rows = array(value.rows, `${name}.rows`, 1, 8);
  rows.forEach((row, index) => {
    if (!Array.isArray(row) || row.length !== header.length) {
      throw new Error(`${name}.rows[${index}] must have ${header.length} columns`);
    }
    row.forEach((cell, cellIndex) => {
      scalar(cell, `${name}.rows[${index}][${cellIndex}]`);
    });
  });
  if (!Number.isInteger(value.highlightRow) || value.highlightRow < -1 || value.highlightRow >= rows.length) {
    throw new Error(`${name}.highlightRow must be -1 or a valid row index`);
  }
}

function validate(data) {
  for (const key of ['meta', 'problem', 'solution', 'market', 'team', 'closing']) object(data[key], key);

  for (const key of ['title', 'subtitle', 'team', 'date', 'notice', 'pattern', 'contact']) {
    text(data.meta[key], `meta.${key}`);
  }
  const pattern = data.meta.pattern.toUpperCase();
  if (!['A', 'B', 'C'].includes(pattern)) throw new Error('meta.pattern must be A, B, or C');

  textArray(data.problem.definition, 'problem.definition');
  scalar(data.problem.number, 'problem.number');
  for (const key of ['unit', 'description', 'source']) text(data.problem[key], `problem.${key}`);

  textArray(data.solution.overview, 'solution.overview');
  textArray(data.solution.workings, 'solution.workings');
  table(data.solution.comparison, 'solution.comparison');

  textArray(data.market.target, 'market.target');
  metric(data.market.size, 'market.size');
  textArray(data.market.entry, 'market.entry');
  metric(data.market.revenue, 'market.revenue');
  table(data.market.funding, 'market.funding');

  array(data.team.members, 'team.members', 1, 4);
  data.team.members.forEach((member, index) => {
    object(member, `team.members[${index}]`);
    for (const key of ['name', 'role', 'career']) text(member[key], `team.members[${index}].${key}`);
  });

  for (const key of ['vision', 'contact', 'thanks']) text(data.closing[key], `closing.${key}`);
}

function sections(pres, data) {
  const divider = (number, labelEn, labelKo, oneLiner) => () =>
    L2_Divider(pres, { number, labelEn, labelKo, oneLiner });

  return {
    problem: [
      divider('01', 'Problem', '문제 정의', '누가 어떤 문제를 겪는가'),
      () => L3_Content(pres, { title: '문제 정의', subtitle: '목표고객이 겪는 불편', bullets: data.problem.definition }),
      () => L4_Number(pres, { title: '문제 규모', number: data.problem.number, unit: data.problem.unit, description: data.problem.description, source: data.problem.source }),
    ],
    solution: [
      divider('02', 'Solution', '해결 방법', '문제를 해결하는 작동 방식'),
      () => L3_Content(pres, { title: '솔루션 개요', subtitle: data.meta.subtitle, bullets: data.solution.overview }),
      () => L3_Content(pres, { title: '작동 방식', subtitle: '고객 경험의 흐름', bullets: data.solution.workings }),
      () => L5_Compare(pres, { title: '차별점 비교', header: data.solution.comparison.header, rows: data.solution.comparison.rows, highlightRow: data.solution.comparison.highlightRow, caption: '동일 기준 비교' }),
    ],
    market: [
      divider('03', 'Market & Strategy', '시장과 성장전략', '누구에게 어떻게 진입하는가'),
      () => L3_Content(pres, { title: '타깃 고객', subtitle: '우선 공략 고객군', bullets: data.market.target }),
      () => L4_Number(pres, { title: '시장 규모', number: data.market.size.number, unit: data.market.size.unit, description: data.market.size.description, source: data.market.size.source }),
      () => L3_Content(pres, { title: '시장 진입 전략', subtitle: '검증부터 확장까지', bullets: data.market.entry }),
      () => L4_Number(pres, { title: '매출·수익 모델', number: data.market.revenue.number, unit: data.market.revenue.unit, description: data.market.revenue.description, source: data.market.revenue.source }),
      () => L5_Compare(pres, { title: '자금 소요·조달', header: data.market.funding.header, rows: data.market.funding.rows, highlightRow: data.market.funding.highlightRow, caption: '금액과 조달 상태' }),
    ],
    team: [
      divider('04', 'Team', '팀 구성', '계획을 실행할 사람과 역할'),
      () => L6_Team(pres, { title: '팀 구성', members: data.team.members }),
    ],
  };
}

async function build(inputPath, outputPath) {
  const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  validate(data);
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';
  pres.author = '홍순성 (methylo)';
  pres.subject = 'K-Startup pitch deck';
  pres.title = data.meta.title;
  pres.company = data.meta.team || '';
  pres.lang = 'ko-KR';
  applyMaster(pres);

  L1_Cover(pres, {
    title: data.meta.title,
    subtitle: data.meta.subtitle,
    team: data.meta.team,
    date: data.meta.date,
    notice: data.meta.notice,
  });

  const group = sections(pres, data);
  const pattern = (data.meta.pattern || 'A').toUpperCase();
  const order = pattern === 'B'
    ? ['team', 'problem', 'solution', 'market']
    : pattern === 'C'
      ? ['market', 'problem', 'solution', 'team']
      : ['problem', 'solution', 'market', 'team'];
  order.flatMap(name => group[name]).forEach(addSlide => addSlide());

  L7_Closing(pres, {
    vision: data.closing.vision,
    contactLabel: 'Contact',
    contact: data.closing.contact || data.meta.contact,
    thanks: data.closing.thanks,
  });

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  await pres.writeFile({ fileName: outputPath });
  return outputPath;
}

if (require.main === module) {
  const input = process.argv[2];
  const output = process.argv[3];
  if (!input || !output) {
    console.error('Usage: node scripts/build-pitch.js <input.json> <output.pptx>');
    process.exit(2);
  }
  build(path.resolve(input), path.resolve(output))
    .then(file => console.log(`Created ${file}`))
    .catch(error => {
      console.error(error.message);
      process.exit(1);
    });
}

module.exports = { build, validate };
