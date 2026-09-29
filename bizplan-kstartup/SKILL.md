---
name: bizplan-kstartup
description: >-
  해당 연도 K-Startup 공고 양식에 맞춰 PSST 사업계획서 본문을 작성한다. bizplan-research의 5종 카드와 JSON을 받아 문제인식·실현가능성·성장전략·팀구성을 구성하며, 예비·초기·재도전 창업 지원사업 본문이 필요할 때 사용한다.
version: 1.2.0
author: 홍순성 (methylo)
license: All Rights Reserved
---

# bizplan-kstartup

K-Startup 계열 정부지원사업의 PSST 본문을 작성한다. 공고마다 항목·분량·평가기준이 다를 수 있으므로 사용자가 제공한 해당 연도 공식 양식을 최우선으로 적용한다.

## 참조 파일

- `references/template.md`: PSST 12개 소항목 서술 프레임
- `references/tables.md`: T-02~T-08 표 계약
- `references/style-guide.md`: 문서 서식
- `references/evaluation-criteria.md`: 제출 전 검토 기준
- `references/input-contract.md`: bizplan-research v1.2 입력 계약
- `references/pitch-output-contract.md`: bizplan-kstartup-pitch v1.2 출력 계약

## 입력 모드

### 파이프라인 모드

`bizplan_input_*.json`과 P·R·S·C·U 5종 카드를 받는다. `references/input-contract.md`에 따라 다음 필드를 검사한다.

- `meta.버전`
- `cross_validation`
- `source_grades.critical_slots_missing_A`
- `fulfillment_report.action_required`
- `missing_slots`
- `slots` 12개와 `tables` T-02~T-08

`cross_validation`에 `blocked`가 있으면 본문 생성을 중단한다. `critical_slots_missing_A` 또는 `action_required`가 있으면 경고와 보강 선택지를 먼저 제시한다. `missing_slots`는 `[추가 필요: 슬롯명]`으로 표시한다.

### 단독 모드

JSON이 없으면 공고 정보, 기업 정보, 아이템, 고객, 시장, 준비 수준, 자금, 팀 정보를 단계별로 받는다. 외부 근거가 필요한 값은 사용자에게 출처를 요청하거나 `bizplan-research` 사용을 안내한다.

## 절차

1. 공식 공고문·사업계획서 양식·평가기준을 확인한다.
2. 입력 계약을 검사하고 `READY`, `PARTIAL`, `BLOCKED`를 판정한다.
3. 표지와 일반현황을 작성한다.
4. 문제인식 1-1~1-3을 작성한다.
5. 실현가능성 2-1~2-3을 작성한다.
6. 성장전략 3-1~3-3을 작성한다.
7. 팀구성 4-1~4-3을 작성한다.
8. T-02~T-08 표를 삽입하고 본문 수치와 대조한다.
9. 평가기준과 미확인 항목을 점검한다.
10. Markdown 원고를 확정하고, 가능한 실행 환경에서 DOCX로 변환한다.

각 단계 후 사용자 확인을 받는다. 사용자가 일괄 진행을 요청해도 사실을 추정해 채우지 않는다.

## 작성 기준

- `~함·~임` 서술체
- 소항목당 300~500자는 권장값이며 공식 분량 제한을 우선함
- 수치는 단위·기준연도·출처를 함께 표시함
- 매출 목표는 가격×고객수×구매빈도 등 산식으로 설명함
- 경쟁사와 자사 정보의 출처를 구분함
- 증빙이 필요한 특허·계약·MOU·매출은 사용자 확인 없이 단정하지 않음

## 출력

기본 산출물은 다음 파일이다.

```text
{기업명}_사업계획서_{공고명}_{YYMMDD}.md
```

실행 환경에 DOCX 생성 도구가 있으면 `references/style-guide.md`를 적용해 `.docx`도 만든다. 파일을 실제로 열어 목차·표·쪽번호·페이지 나눔을 확인하기 전에는 DOCX 완성을 선언하지 않는다. HWPX 변환은 해당 변환 기능이 있는 환경에서만 별도 수행한다.

다음 단계용 피치덱 입력 JSON을 `references/pitch-output-contract.md`에 맞춰 함께 제공한다.

```text
{기업명}_pitch_input_{YYMMDD}.json
```

## 완료 확인

- [ ] 공식 공고 양식과 제출 분량을 확인했다.
- [ ] 5종 카드와 JSON 입력 계약을 처리했다.
- [ ] PSST 12개 소항목이 있다.
- [ ] T-02~T-08 표와 본문 수치가 일치한다.
- [ ] 누락 정보와 근거 부족을 표시했다.
- [ ] 평가기준 체크리스트를 통과했다.
- [ ] DOCX를 만들었다면 실제 파일을 열어 검증했다.
