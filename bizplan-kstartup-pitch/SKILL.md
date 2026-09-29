---
name: bizplan-kstartup-pitch
description: >-
  K-Startup 사업계획서의 핵심 내용을 기본 17장 발표용 피치덱으로 구성한다. 피치 입력 JSON을 검토하고 문제·솔루션·시장·전략·팀 순서를 선택해 PPTX와 발표 노트를 만들 때 사용한다.
version: 1.2.0
author: 홍순성 (methylo)
license: All Rights Reserved
---

# bizplan-kstartup-pitch

사업계획서의 핵심 주장과 수치를 17장 발표용 피치덱으로 변환한다. 생성기는 섹션 순서를 바꾸는 세 가지 패턴을 지원하며 슬라이드 수는 17장으로 고정한다.

## 포함 파일

- `references/slide-blocks.md`: 레이아웃 규격
- `references/template.js`: PptxGenJS 레이아웃 함수
- `references/narrative-patterns.md`: 본문과 슬라이드 매핑
- `references/pitch-input-schema.md`: 생성기 입력 계약
- `scripts/build-pitch.js`: 17장 PPTX 생성기
- `examples/pitch-input.example.json`: 가상 입력 예시
- `package.json`: Node.js 의존성과 실행 명령

## 준비

```text
cd bizplan-kstartup-pitch
npm install
npm run build -- examples/pitch-input.example.json output.pptx
```

Node.js와 `pptxgenjs`가 필요하다. Noto Sans KR이 없으면 실행 환경의 한글 산세리프 글꼴로 대체될 수 있으므로 최종 파일에서 줄바꿈을 확인한다.

## 절차

1. 사업계획서 또는 `*_pitch_input_*.json`에서 핵심 내용을 추출한다.
2. `references/pitch-input-schema.md`의 필수 값을 확인한다.
3. Problem-First, Team-First, Market & Strategy-First 중 섹션 순서를 추천하고 사용자 확인을 받는다.
4. 최종 슬라이드 목록과 제목을 확정한다.
5. 입력 JSON을 `scripts/build-pitch.js`로 전달해 PPTX를 생성한다.
6. 파일 존재, 슬라이드 수, ZIP 무결성, 텍스트 오버플로를 확인한다.
7. 필요하면 슬라이드별 발표 노트를 Markdown으로 작성한다.

`.docx` 직접 추출 기능은 생성기에 포함되어 있지 않다. 실행 환경의 문서 읽기 기능으로 피치 입력 JSON을 먼저 만든다. 입력 JSON 없이 17장 자동 생성을 완료했다고 보고하지 않는다.

## 기본 17장

```text
S1  표지
S2  Problem 구분
S3  문제 정의
S4  문제 규모
S5  Solution 구분
S6  솔루션 개요
S7  작동 방식
S8  차별점 비교
S9  Market & Strategy 구분
S10 타깃 고객
S11 시장 규모
S12 진입 전략
S13 매출·수익 모델
S14 자금 소요·조달
S15 Team 구분
S16 팀 구성
S17 비전·CTA
```

## 패턴 선택

- Problem-First: 문제→솔루션→시장·전략→팀
- Team-First: 팀→문제→솔루션→시장·전략
- Market & Strategy-First: 시장·전략→문제→솔루션→팀

패턴은 4개 섹션의 순서만 바꾸며, 트랙션 슬라이드나 새로운 근거를 자동 생성하지 않는다.

## 출력

```text
{기업명}_피치덱_{YYMMDD}.pptx
{기업명}_발표노트_{YYMMDD}.md
```

## 완료 확인

- [ ] 입력 JSON의 필수 필드가 있다.
- [ ] 수치마다 기준과 출처가 있다.
- [ ] 슬라이드당 핵심 메시지가 하나다.
- [ ] PPTX가 실제 생성되고 17장이다.
- [ ] 팀 슬라이드를 포함한 모든 레이아웃이 생성된다.
- [ ] 글꼴 대체와 텍스트 오버플로를 확인했다.
- [ ] 발표 시간에 맞춰 발표 노트 분량을 조정했다.
