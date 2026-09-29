# bizplan-input-schema.md — bizplan-kstartup 입력 JSON 스키마 (v1.1)

bizplan-research의 Step 4 최종 출력. bizplan-kstartup이 입력값으로 받는 JSON 객체의 고정 스키마를 정의합니다.

## 파일명 규칙

```
bizplan_input_{사업명}_{YYMMDD}.json
```

## 최상위 구조

```json
{
  "meta": { ... },
  "slots": {
    "1-1": { ... }, "1-2": { ... }, "1-3": { ... },
    "2-1": { ... }, "2-2": { ... }, "2-3": { ... },
    "3-1": { ... }, "3-2": { ... }, "3-3": { ... },
    "4-1": { ... }, "4-2": { ... }, "4-3": { ... }
  },
  "tables": { ... },
  "source_grades": { ... },
  "cross_validation": { ... },
  "fulfillment_report": { ... },
  "missing_slots": [ ... ]
}
```

## 필드 정의

### meta

```json
{
  "meta": {
    "사업명": "string",
    "한줄정의": "string (≤30자)",
    "작성일": "YYYY-MM-DD",
    "업종": "IT서비스 | 제조 | 소상공인 | 기술기반",
    "창업유형": "예비 | 초기 | 재도전",
    "핵심키워드": ["keyword1", "keyword2", "..."],
    "버전": "bizplan-research v1.1"
  }
}
```

### slots (12개 소항목)

각 슬롯은 공통 구조를 따릅니다.

```json
{
  "slots": {
    "1-1": {
      "title": "창업 아이템 개발 동기·목적",
      "타깃_고객": "string",
      "상황_조건": "string",
      "불편_손실": "string",
      "수치_또는_사례": {
        "본문": "string",
        "출처_기관": "string",
        "출처_연도": "YYYY",
        "등급": "A | B | C"
      },
      "창업_동기": "string (U-카드 출처)",
      "참조_표": "T-02"
    },
    "1-2": {
      "title": "외부 환경",
      "관련_정책": ["string", "string"],
      "변화_방향": "string",
      "관련_기술_트렌드": "string",
      "인구_생활_문화_변화": "string",
      "차별적_포지션": "string"
    },
    "1-3": {
      "title": "목표시장·고객 현황",
      "연령_성별_직업": "string",
      "파생_고객군": "string",
      "TAM_SAM_SOM": "T-03",
      "구체_사례": "string",
      "기존_대안의_한계": "string",
      "해결되지_않은_지점": "string"
    },
    "2-1": {
      "title": "창업 아이템 현황",
      "준비_수준": "T-04",
      "기술명_수준": "string",
      "특허_상표": [{"종류": "특허|상표", "번호": "string", "상태": "string"}],
      "협력_기업_기관": ["string"],
      "MVP_테스트_결과": "string"
    },
    "2-2": {
      "title": "실현·구체화 방안",
      "기능_1": "string",
      "기능_2": "string",
      "기능_3": "string",
      "동작_방식": "string",
      "개발_단계": "기획 | 개발 | 베타 | 출시",
      "핵심_KPI": "string"
    },
    "2-3": {
      "title": "차별화 방안",
      "경쟁자_비교표": "T-05",
      "차별점_1": {"본문": "string", "근거": "string"},
      "차별점_2": {"본문": "string", "근거": "string"},
      "차별점_3": {"본문": "string", "근거": "string"},
      "모방_난이도_선점이점": "string"
    },
    "3-1": {
      "title": "자금 소요·조달 계획",
      "자금_소요_표": "T-06-A",
      "자금_조달_표": "T-06-B",
      "우선순위_1": "string",
      "우선순위_2": "string"
    },
    "3-2": {
      "title": "시장 진입·성과 창출 전략",
      "MVP_Beta_정식_단계": "string",
      "주력_채널": "string",
      "보조_채널": ["string", "string"],
      "매출_목표": {"Y1": "number", "Y2": "number", "Y3": "number"}
    },
    "3-3": {
      "title": "사업 추진 일정",
      "간트_표": "T-07",
      "핵심_마일스톤": [{"시기": "YYYY-MM", "내용": "string"}]
    },
    "4-1": {
      "title": "대표자·팀원 현황",
      "대표자_이력": [{"시기": "string", "내용": "string"}],
      "팀원_표": "T-08",
      "역량_매핑": "string"
    },
    "4-2": {
      "title": "외부 협력 네트워크",
      "협력처": ["string"],
      "자문_멘토": [{"이름": "string", "소속": "string", "관계": "string"}],
      "네트워크_활용_계획": "string"
    },
    "4-3": {
      "title": "중장기 인력 운용",
      "단기_채용": "string",
      "중기_채용": "string",
      "장기_채용": "string",
      "인재_확보_방식": "string"
    }
  }
}
```

### tables (T-NN 표 데이터)

표는 2차원 배열로 저장. 첫 행은 헤더, 이후 행은 데이터.

```json
{
  "tables": {
    "T-02": {
      "title": "타깃 고객 요약",
      "headers": ["구분", "규모", "출처"],
      "rows": [
        ["30~40대 소상공인", "120만 명", "통계청 2024"],
        ["...", "...", "..."]
      ]
    },
    "T-03": {
      "title": "TAM/SAM/SOM",
      "headers": ["계층", "정의", "규모", "출처"],
      "rows": [
        ["TAM", "전체 시장", "5조 원", "KOSIS 2024"],
        ["SAM", "유효 시장", "1.2조 원", "업계 추산"],
        ["SOM", "수익 시장", "180억 원", "3년차 목표"]
      ]
    },
    "T-05": {
      "title": "경쟁자 비교",
      "headers": ["축", "자사", "경쟁 A", "경쟁 B", "경쟁 C"],
      "rows": [
        ["가격", "...", "...", "...", "..."],
        ["핵심 기능", "...", "...", "...", "..."]
      ]
    }
  }
}
```

표 ID는 bizplan-kstartup template.md의 T-NN 식별자와 1:1 대응.

### source_grades (출처 등급 집계)

```json
{
  "source_grades": {
    "A_count": 5,
    "B_count": 8,
    "C_count": 3,
    "A_ratio": 0.3125,
    "critical_slots_with_A": ["1-3.TAM", "2-1.특허", "3-1.자금"],
    "critical_slots_missing_A": []
  }
}
```

bizplan-kstartup은 `critical_slots_missing_A`가 비어있을 때만 최종 본문 생성. 비어있지 않으면 경고 출력.

### cross_validation (교차 검증 결과)

```json
{
  "cross_validation": {
    "규모_정합성": {"pass": true, "detail": "P-SAM 1.2조 ≥ C-경쟁사 매출 합 8천억 × 1.2 = 9.6천억"},
    "타깃_정합성": {"pass": true, "detail": "공통 타깃: 30~40대 소상공인"},
    "정책_정합성": {"pass": false, "detail": "P-정책 2026-06 > S-지원사업 2026-03"},
    "자금_정합성": {"pass": true, "detail": "S-평균 5억 ≥ U-희망 지원금 5억 × 0.6"},
    "단계_정합성": {"pass": true, "detail": "U-베타 = R-벤치마크 베타 단계"}
  }
}
```

필수 3항목(규모·타깃·정책) 중 하나라도 `pass: false`면 bizplan-kstartup은 실행 중단, 사용자에게 수정 요청.

### fulfillment_report (충족률 리포트)

```json
{
  "fulfillment_report": {
    "P_card": {"filled": 12, "total": 13, "rate": 0.923},
    "R_card": {"filled": 10, "total": 10, "rate": 1.0},
    "S_card": {"filled": 8, "total": 10, "rate": 0.8},
    "C_card": {"filled": 15, "total": 18, "rate": 0.833},
    "U_card": {"filled": 17, "total": 20, "rate": 0.85},
    "overall": {"filled": 62, "total": 71, "rate": 0.873},
    "threshold": 0.9,
    "action_required": true
  }
}
```

`overall.rate < threshold`일 때 `action_required: true` → bizplan-kstartup 진입 전 재검색 권장.

### missing_slots

```json
{
  "missing_slots": [
    {
      "slot": "1-3.파생_고객군",
      "type": "research",
      "suggested_search": "{사업 아이템} 유사 타깃 세그먼트"
    },
    {
      "slot": "4-1.대표자_이력",
      "type": "user_input",
      "suggested_question": "대표자 최근 이력 3건을 연도 순으로 알려주세요"
    }
  ]
}
```

- `type: "research"` → Step 2 재검색 대상
- `type: "user_input"` → U-카드 재요청 대상

## 최소 유효 예시 (minimal valid example)

```json
{
  "meta": {
    "사업명": "노인 돌봄앱",
    "한줄정의": "요양보호사-보호자 실시간 연결 플랫폼",
    "작성일": "2026-04-24",
    "업종": "IT서비스",
    "창업유형": "예비",
    "핵심키워드": ["노인돌봄", "요양보호사", "실시간알림"],
    "버전": "bizplan-research v1.1"
  },
  "slots": {
    "1-1": {
      "title": "창업 아이템 개발 동기·목적",
      "타깃_고객": "65세 이상 노인을 돌보는 30~50대 보호자",
      "상황_조건": "부모 돌봄을 방문 요양보호사에게 맡기는 가정",
      "불편_손실": "보호사의 방문 시간·활동 내용을 실시간으로 알 수 없어 불안",
      "수치_또는_사례": {
        "본문": "방문 요양 이용 가정 중 68%가 서비스 불안 경험",
        "출처_기관": "보건복지부",
        "출처_연도": "2024",
        "등급": "A"
      },
      "창업_동기": "본인 부모 돌봄 경험에서 시작",
      "참조_표": "T-02"
    }
  },
  "source_grades": {"A_count": 3, "B_count": 5, "C_count": 2, "critical_slots_missing_A": []},
  "cross_validation": {"규모_정합성": {"pass": true}, "타깃_정합성": {"pass": true}, "정책_정합성": {"pass": true}},
  "fulfillment_report": {"overall": {"rate": 0.92}, "action_required": false},
  "missing_slots": []
}
```

## bizplan-kstartup 측 계약

bizplan-kstartup은 입력 JSON을 받았을 때:

1. `meta.버전 ≠ bizplan-research v1.1` → 스키마 호환 경고
2. `cross_validation.*.pass`에 false 존재 → 실행 중단
3. `source_grades.critical_slots_missing_A.length > 0` → 본문 상단에 "⚠ 공공통계 출처 보강 권장" 주석
4. `fulfillment_report.action_required = true` → 사용자에게 재검색 제안, 사용자 확인 시 실행 계속
5. `missing_slots` 각 항목 → 본문에 `[⚠ 추가 필요: {slot}]` 자리표시자 삽입

이 계약을 지키면 bizplan-research → bizplan-kstartup 연결은 수동 개입 없이 자동으로 흐릅니다.
