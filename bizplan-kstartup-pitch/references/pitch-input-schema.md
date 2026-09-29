# 피치 입력 JSON 계약

입력은 `meta`, `problem`, `solution`, `market`, `team`, `closing`을 포함한다. 모든 문자열과 배열은 사업계획서 또는 사용자 확인 자료에서 가져온다.

## 필수 구조

```json
{
  "meta": {"title": "", "subtitle": "", "team": "", "date": "", "notice": "", "pattern": "A|B|C", "contact": ""},
  "problem": {"definition": [], "number": "", "unit": "", "description": "", "source": ""},
  "solution": {"overview": [], "workings": [], "comparison": {"header": [], "rows": [], "highlightRow": 0}},
  "market": {"target": [], "size": {"number": "", "unit": "", "description": "", "source": ""}, "entry": [], "revenue": {"number": "", "unit": "", "description": "", "source": ""}, "funding": {"header": [], "rows": [], "highlightRow": -1}},
  "team": {"members": [{"name": "", "role": "", "career": ""}]},
  "closing": {"vision": "", "contact": "", "thanks": ""}
}
```

`pattern`은 A(Problem-First), B(Team-First), C(Market & Strategy-First)다. 세 패턴 모두 섹션 순서만 바뀌고 17장으로 생성된다. 팀원은 1~4명이며, 수치 슬라이드에는 `source`를 넣는다. 글머리 배열은 1~5개 문자열, 비교표는 2~5열·1~8행으로 제한한다. `highlightRow`는 `-1` 또는 실제 행 인덱스다.
