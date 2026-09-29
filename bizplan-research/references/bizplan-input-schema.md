# bizplan-input-schema v1.2

`bizplan-research`가 만들고 `bizplan-kstartup`이 읽는 전달 계약이다. 예시는 모두 가상 데이터다.

## 파일명

```text
bizplan_input_{사업명}_{YYMMDD}.json
```

## 필수 최상위 필드

```json
{
  "meta": {},
  "slots": {},
  "tables": {},
  "source_grades": {},
  "cross_validation": {},
  "fulfillment_report": {},
  "missing_slots": []
}
```

## meta

```json
{
  "사업명": "string",
  "한줄정의": "string",
  "작성일": "YYYY-MM-DD",
  "업종": "string",
  "창업유형": "예비 | 초기 | 재도전",
  "핵심키워드": ["string"],
  "버전": "bizplan-research v1.2"
}
```

## slots

`1-1`, `1-2`, `1-3`, `2-1`, `2-2`, `2-3`, `3-1`, `3-2`, `3-3`, `4-1`, `4-2`, `4-3` 키가 모두 있어야 한다. 각 슬롯은 다음 공통 필드를 가진다.

```json
{
  "title": "string",
  "content": {},
  "evidence_ids": ["E-001"],
  "missing": []
}
```

`content`의 세부 항목은 `slot-mapping.md`를 따른다. 확인되지 않은 값은 만들지 말고 `missing`에 기록한다.

## tables

모든 표는 `title`, `headers`, `rows`를 가진다. 각 행의 열 수는 `headers`와 같아야 한다.

- T-02 목표고객: `고객군, 상황, 문제, 규모, 출처`
- T-03 TAM·SAM·SOM: `계층, 정의, 산식, 규모, 기준연도, 출처`
- T-04 준비 수준: `영역, 현재 상태, 증빙, 다음 단계, 완료 시점`
- T-05 경쟁자 비교: `비교 축, 자사, 경쟁 A, 경쟁 B, 경쟁 C, 근거`
- T-06-A 자금 소요: `용도, 단가, 수량, 금액, 시기, 산출근거`
- T-06-B 자금 조달: `조달원, 금액, 확정 여부, 예정 시기, 근거`
- T-07 추진 일정: `기간, 과업, 산출물, 담당, 완료 기준`
- T-08 팀 구성: `이름 또는 직무, 역할, 핵심 역량, 합류 시기, 고용 형태, 증빙`

예시:

```json
{
  "T-03": {
    "title": "TAM·SAM·SOM",
    "headers": ["계층", "정의", "산식", "규모", "기준연도", "출처"],
    "rows": [["TAM", "가상 전체시장", "가상 단가×가상 고객수", 0, "20XX", "가상 예시"]]
  }
}
```

## source_grades

```json
{
  "A_count": 0,
  "B_count": 0,
  "C_count": 0,
  "critical_slots_with_A": [],
  "critical_slots_missing_A": []
}
```

## cross_validation

고정 배수로 시장 타당성을 판정하지 않는다. 각 검사는 비교 가능성과 근거를 기록한다.

```json
{
  "market_scope": {
    "status": "pass | warning | not_comparable | blocked",
    "detail": "기준연도·지역·통화·포함 범위 설명",
    "evidence_ids": ["E-001"]
  },
  "competitor_scope": {
    "status": "pass | warning | not_comparable | blocked",
    "detail": "동일 기간·사업 범위 여부",
    "evidence_ids": []
  },
  "notice_eligibility": {
    "status": "pass | warning | blocked",
    "detail": "공고 자격·접수 기간·지원 상한 확인",
    "evidence_ids": ["E-010"]
  },
  "user_evidence_conflict": {
    "status": "pass | warning | blocked",
    "detail": "사용자 입력과 외부 근거 충돌 여부",
    "evidence_ids": []
  }
}
```

`blocked`가 하나라도 있으면 downstream 생성을 중단한다. `not_comparable`은 실패가 아니라 계산하지 않았다는 뜻이다.

## fulfillment_report

```json
{
  "overall": {"filled": 0, "total": 0, "rate": 0.0},
  "threshold": 0.9,
  "action_required": true,
  "status": "READY | PARTIAL | BLOCKED"
}
```

충족률은 항목 존재 여부만 나타내며 사업 타당성 점수가 아니다.

## missing_slots

```json
[
  {
    "slot": "1-3.TAM",
    "type": "research",
    "reason": "기준연도 일치 자료 없음",
    "next_action": "공식 통계 원문 확인"
  },
  {
    "slot": "4-1.대표자_이력",
    "type": "user_input",
    "reason": "사용자 전용 정보",
    "next_action": "최근 이력 3건 질문"
  }
]
```

## downstream 처리

`bizplan-kstartup`은 다음 순서로 처리한다.

1. 버전과 12개 슬롯, T-02~T-08을 검사한다.
2. `cross_validation`의 `blocked`를 확인한다.
3. `critical_slots_missing_A`와 `action_required`를 사용자에게 알린다.
4. `missing_slots`를 자리표시자와 보강 질문으로 변환한다.
5. READY이면 본문을 작성하고, PARTIAL이면 경고를 포함한 초안만 작성한다.
