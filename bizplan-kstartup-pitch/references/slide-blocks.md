# slide-blocks.md — 레이아웃 좌표·치수 사양

기준: pptxgenjs LAYOUT_WIDE (13.333" × 7.5"), 단위 inch.
모든 좌표는 좌상단 원점.

## 공통 토큰

```
COLOR
  primary:    #1E3A8A   (네이비 — 강조·헤더)
  text:       #1F2937   (본문)
  muted:      #6B7280   (캡션)
  bg_light:   #F3F4F6   (박스 배경)
  border:     #D1D5DB   (선)
  white:      #FFFFFF
  accent_bg:  #EEF2FF   (강조 영역 옅은 배경)

FONT
  face: "Noto Sans KR"
  size:
    title_cover:    54  (Bold)
    title_section:  90  (Bold, 숫자)
    section_label:  28  (Bold)
    title_content:  32  (Bold)
    subtitle:       20  (Medium)
    body_light:     18  (Regular)
    body_heavy:     15  (Regular)
    number_large:   60  (Bold)
    table_head:     14  (Medium)
    table_body:     13  (Regular)
    caption:        12  (Regular)
    footer:         10  (Regular)

MARGIN
  page_lr:  0.5
  page_tb:  0.4
  block_gap: 0.3
```

---

## L1 타이틀 (S1 표지)

```
배경: white

[대제목]      x=0.5,  y=2.6,  w=12.3, h=1.4   (54pt Bold, primary)
[부제]        x=0.5,  y=4.1,  w=12.3, h=0.6   (24pt Medium, text)
[구분선]      x=5.0,  y=5.0,  w=3.3,  h=0.02  (border, 두께 1pt)
[팀명]        x=0.5,  y=5.5,  w=12.3, h=0.5   (18pt Regular, text)
[제출일]      x=0.5,  y=6.1,  w=12.3, h=0.4   (14pt Regular, muted)
[공고명]      x=0.5,  y=6.8,  w=12.3, h=0.3   (footer, muted)
```

## L2 섹션 디바이더 (PSST 4구간 진입)

```
[좌측 블록]    x=0,    y=0,    w=4.5,  h=7.5   (배경 primary)
[숫자]         x=0.8,  y=2.0,  w=2.9,  h=2.5   (90pt Bold, white) — 01/02/03/04
[섹션 영문명]  x=0.8,  y=4.5,  w=2.9,  h=0.8   (28pt Bold, white) — Problem/Solution/...
[섹션 한글명]  x=5.2,  y=3.0,  w=7.6,  h=1.0   (36pt Bold, primary)
[한 줄 설명]   x=5.2,  y=4.2,  w=7.6,  h=0.6   (20pt Medium, muted)
```

## L3 콘텐츠 텍스트 (서술 슬라이드 — 본문 다수가 이 형식)

```
[제목]        x=0.5,  y=0.5,  w=12.3, h=0.8   (32pt Bold, primary)
[부제]        x=0.5,  y=1.4,  w=12.3, h=0.5   (20pt Medium, muted)
[하단 구분선] x=0.5,  y=2.0,  w=12.3, h=0.02  (border)
[본문 영역]   x=0.5,  y=2.4,  w=12.3, h=4.4   (18pt Regular, text)
              - 행간 150%
              - 최대 5줄
              - 글머리 ● (primary 색)
[페이지 번호] x=12.5, y=7.05, w=0.5,  h=0.3   (footer, muted, 우측 정렬)
```

## L4 수치 강조 (시장 규모·매출·자금)

```
[제목]            x=0.5,  y=0.5,  w=12.3, h=0.8
[하단 구분선]     x=0.5,  y=1.5,  w=12.3, h=0.02
[대형 숫자]       x=0.5,  y=2.5,  w=6.5,  h=2.5  (60pt Bold, primary)
[단위·기준]       x=0.5,  y=5.1,  w=6.5,  h=0.5  (18pt Medium, muted)
[설명 박스]       x=7.5,  y=2.5,  w=5.3,  h=3.5  (배경 bg_light, 패딩 0.3)
                  - 내부: 18pt Regular, text
[출처 캡션]       x=0.5,  y=6.8,  w=12.3, h=0.3  (caption, muted)
```

## L5 비교표 (경쟁자 비교)

```
[제목]        x=0.5,  y=0.5,  w=12.3, h=0.8
[표]          x=0.5,  y=1.8,  w=12.3, h=4.8
              - 행 수: 3~5
              - 열 수: 3~4 (자사 + 경쟁자 2~3)
              - 헤더: bg_light 배경, 14pt Medium
              - 본문: 13pt Regular
              - 자사 행: primary 배경, white 텍스트
[캡션]        x=0.5,  y=6.8,  w=12.3, h=0.3   (caption, muted)
```

## L6 팀 카드 (팀 구성)

```
[제목]        x=0.5,  y=0.5,  w=12.3, h=0.8

카드 그리드 (2~4인 가변):
  공통: y=1.8, h=5.0
  
  2인: x=2.0,  w=4.3 / x=7.0,  w=4.3
  3인: x=0.7,  w=3.9 / x=4.7,  w=3.9 / x=8.7,  w=3.9
  4인: x=0.5,  w=3.0 / x=3.7,  w=3.0 / x=6.9,  w=3.0 / x=10.1, w=3.0

각 카드 내부:
  사진 원      cx=중심, cy=2.6, r=0.7  (border line)
  이름        y=4.0, h=0.5   (20pt Bold, primary)
  역할        y=4.5, h=0.4   (15pt Medium, text)
  이력        y=4.9, h=1.5   (13pt Regular, muted, 최대 3줄)
```

## L7 클로징 (비전·CTA)

```
[비전 문장]    x=0.5,  y=2.0,  w=12.3, h=2.0   (40pt Bold, primary, 중앙 정렬)
[구분선]       x=5.5,  y=4.5,  w=2.3,  h=0.02  (border)
[연락처 라벨]  x=0.5,  y=5.0,  w=12.3, h=0.4   (14pt Medium, muted, 중앙)
[연락처]       x=0.5,  y=5.5,  w=12.3, h=0.5   (18pt Regular, text, 중앙)
[감사 문구]    x=0.5,  y=6.5,  w=12.3, h=0.5   (24pt Bold, primary, 중앙)
```

---

## 마스터 슬라이드 공통 요소

```
[좌측 상단 서비스명]   x=0.4, y=0.15, w=4.0, h=0.3   (10pt Bold, primary)
[우측 상단 슬라이드 #] x=12.6, y=0.15, w=0.4, h=0.3  (10pt Regular, muted, 우측)
[우측 악센트 바]       x=13.27, y=0, w=0.06, h=7.5   (배경 primary)
[하단 푸터]            x=0.4, y=7.2, w=12.5, h=0.25  (10pt Regular, muted)
```

L1·L2·L7은 마스터 푸터·번호 숨김. L3~L6에만 적용.

## 검증 체크리스트

- 모든 텍스트가 슬라이드 경계(13.333 × 7.5) 안에 위치
- 블록 간 간격 최소 0.3" 확보
- 폰트는 Noto Sans KR로 고정
- 컬러는 토큰 7색 외 사용 금지
- 본문 슬라이드(L3) 본문 5줄 초과 금지
