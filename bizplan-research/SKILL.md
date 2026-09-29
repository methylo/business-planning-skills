---
name: bizplan-research
description: >-
  K-Startup 사업계획서 작성 전에 시장·문제·사례·자금·경쟁 근거와 사용자 입력을 5종 카드로 정리하고, 본문 작성용 JSON으로 변환한다. 시장 조사, 경쟁사 조사, 정부지원사업 근거 수집, TAM·SAM·SOM 산정이 필요할 때 사용한다. 본문 작성은 bizplan-kstartup을 사용한다.
version: 1.2.0
author: 홍순성 (methylo)
license: All Rights Reserved
---

# bizplan-research

사업계획서 본문을 쓰기 전에 외부 근거와 사용자 전용 정보를 분리해 수집한다. 최종 산출물은 P·R·S·C·U 5종 카드, 통합 인덱스, `bizplan_input_*.json`이다.

## 참조 파일

- `references/card-templates.md`: 5종 카드 양식
- `references/slot-mapping.md`: 카드와 PSST 12개 소항목 연결
- `references/search-prompts.md`: 검색 질의 예시
- `references/bizplan-input-schema.md`: downstream 입력 계약

## 입력

- 사업 아이템 한 줄 정의
- 핵심 키워드 3~5개
- 목표고객과 업종
- 창업 유형
- 사용자만 아는 대표자·팀·자산·네트워크·일정 정보

## 5종 카드

- P(Problem & Market): 시장 규모, 고객 통계, 정책·규제, 문제 사례
- R(Reference Case): 국내외 유사 사례, 성공·실패 요인
- S(Scale-up): 자금 규모, 현재 접수 가능한 지원사업, 진입 채널, 수익 모델
- C(Competitor): 경쟁사 3~5개, 동일 기준 비교, 차별점
- U(User Input): 대표자, 팀, 보유 자산, 네트워크, 일정, 리스크

## 절차

1. 사업 아이템과 범위를 확정하고 U-카드 입력 양식을 제시한다.
2. P·R·S·C 카드를 조사한다. 검색 결과 문구만으로 채우지 말고 원문을 확인한다.
3. 출처·단위·기준일·비교 범위를 검증하고 상태를 판정한다.
4. 사용자의 U-카드 입력을 반영하고 누락 항목을 구분한다.
5. `references/bizplan-input-schema.md`에 맞춰 JSON을 생성한다.
6. JSON과 5종 카드의 값이 일치하는지 다시 확인한다.

## 출처 기준

- A: 정부·공공기관 원문과 공식 통계
- B: 학술·협회·민간 리서치의 원문
- C: 언론·기업 IR·공식 제품 자료
- 참고: 커뮤니티·리뷰·검색 결과 문구. 단독 근거로 사용하지 않는다.

핵심 시장 수치에는 기준연도, 지역, 통화, 산정 범위를 함께 기록한다. 오래된 자료는 자동 폐기하지 말고 최신 자료가 없는 이유와 한계를 표시한다. 정부지원사업은 현재 공고 원문에서 접수 기간·자격·지원 상한을 확인한다.

## 검증 상태

### READY

- 핵심 주장에 원문 근거와 URL이 있다.
- TAM·SAM·SOM의 산식과 단위가 일치한다.
- 경쟁사 비교 기간·시장·사업 범위가 비교 가능하다.
- 현재 공고의 자격과 접수 기간을 확인했다.
- downstream 필수 필드가 모두 있다.

### PARTIAL

- 비핵심 슬롯이 비었거나 B·C 등급 근거만 있다.
- 비교 불가능한 수치를 억지로 계산하지 않고 `not_comparable`로 기록했다.
- 본문에는 자리표시자와 보강 방법을 남긴다.

### BLOCKED

- 공식 공고 또는 핵심 시장 근거 원문을 확인하지 못했다.
- 단위·기준 기간이 충돌하고 해소할 수 없다.
- 사용자 전용 핵심 정보가 없어 사실 기반 서술이 불가능하다.

`BLOCKED`이면 본문 자동 생성을 중단한다. 고정 배수나 임의 임계값으로 시장 타당성을 판정하지 않는다.

## 출력 계약

파일명:

```text
BR_P-카드_{사업명}_{YYMMDD}.md
BR_R-카드_{사업명}_{YYMMDD}.md
BR_S-카드_{사업명}_{YYMMDD}.md
BR_C-카드_{사업명}_{YYMMDD}.md
BR_U-카드_{사업명}_{YYMMDD}.md
BR_인덱스_{사업명}_{YYMMDD}.md
bizplan_input_{사업명}_{YYMMDD}.json
```

JSON 필수 최상위 필드:

```text
meta, slots, tables, source_grades, cross_validation,
fulfillment_report, missing_slots
```

`cross_validation`에는 각 검사의 `status`, `detail`, `evidence_ids`를 기록한다. 상태는 `pass`, `warning`, `not_comparable`, `blocked` 중 하나다. `critical_slots_missing_A`, `fulfillment_report.action_required`, `missing_slots`는 `bizplan-kstartup`으로 그대로 전달한다.

## 완료 확인

- [ ] P·R·S·C·U 5종 카드가 있다.
- [ ] 핵심 수치마다 원문 URL·기준일·단위가 있다.
- [ ] 허위 정밀도와 비교 불가능한 계산이 없다.
- [ ] JSON에 12개 슬롯과 T-02~T-08 표 계약이 있다.
- [ ] 누락 항목이 `research`와 `user_input`으로 구분되었다.
- [ ] READY·PARTIAL·BLOCKED 상태와 다음 조치가 기록되었다.
