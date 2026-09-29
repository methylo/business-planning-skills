# bizplan-research v1.2 입력 계약

별도로 설치된 스킬도 이 파일만으로 upstream 입력을 판정할 수 있어야 한다.

## 필수 최상위 필드

```text
meta, slots, tables, source_grades, cross_validation,
fulfillment_report, missing_slots
```

## 판정 순서

1. `meta.버전`이 `bizplan-research v1.2`인지 확인한다.
2. `slots`에 `1-1`부터 `4-3`까지 12개 키가 있는지 확인한다.
3. `tables`에 T-02, T-03, T-04, T-05, T-06-A, T-06-B, T-07, T-08이 있는지 확인한다.
4. `cross_validation`에서 `status: blocked`가 있으면 생성을 중단한다.
5. `source_grades.critical_slots_missing_A`가 비어 있지 않으면 근거 보강을 요청한다.
6. `fulfillment_report.action_required`가 true이면 사용자 확인 전 초안을 확정하지 않는다.
7. `missing_slots`는 유형별로 처리한다.
   - `research`: 재검색 또는 근거 요청
   - `user_input`: 사용자 질문

## 상태

- READY: 필수 필드와 근거가 충족됨
- PARTIAL: 자리표시자를 남기고 초안 작성 가능
- BLOCKED: 핵심 근거·공고·사용자 정보가 없어 작성 중단

## 수정 반환 블록

```json
{
  "status": "PARTIAL",
  "return_to": "bizplan-research",
  "issues": [
    {"slot": "1-3.TAM", "type": "research", "reason": "기준연도 불일치"}
  ]
}
```
