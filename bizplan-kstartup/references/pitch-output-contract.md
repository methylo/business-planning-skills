# bizplan-kstartup-pitch 출력 계약 v1.2

`bizplan-kstartup`이 작성하고 `bizplan-kstartup-pitch`가 읽는 JSON 계약이다. 별도로 설치된 스킬도 이 파일만으로 출력 구조를 만들 수 있어야 한다.

## 필수 최상위 필드

```json
{
  "meta": {},
  "problem": {},
  "solution": {},
  "market": {},
  "team": {},
  "closing": {}
}
```

## 필수 하위 필드

- `meta`: `title`, `subtitle`, `team`, `date`, `notice`, `pattern`, `contact`
- `problem`: `definition` 배열, `number`, `unit`, `description`, `source`
- `solution`: `overview` 배열, `workings` 배열, `comparison`
- `solution.comparison`: `header`, `rows`, `highlightRow`
- `market`: `target` 배열, `size`, `entry` 배열, `revenue`, `funding`
- `market.size`: `number`, `unit`, `description`, `source`
- `market.revenue`: `number`, `unit`, `description`, `source`
- `market.funding`: `header`, `rows`, `highlightRow`
- `team`: `members` 1~4명. 각 원소는 `name`, `role`, `career`
- `closing`: `vision`, `contact`, `thanks`

## 패턴

- `A`: Problem-First — 문제→솔루션→시장·전략→팀
- `B`: Team-First — 팀→문제→솔루션→시장·전략
- `C`: Market & Strategy-First — 시장·전략→문제→솔루션→팀

현재 생성기는 세 패턴 모두 17장이다. 트랙션을 별도 필드나 슬라이드로 자동 생성하지 않는다.

## 생성 전 검사

1. 사업계획서의 수치·문구를 그대로 옮기고 새 사실을 만들지 않는다.
2. `problem.number`, `market.size`, `market.revenue`에 기준과 출처를 넣는다.
3. 글머리 배열은 1~5개 문자열로 제한한다.
4. 비교표는 2~5열·1~8행으로 만들고 헤더와 모든 행의 열 수를 같게 한다.
5. `highlightRow`는 `-1` 또는 실제 행 인덱스로 지정한다.
6. 자금표의 금액 합계를 사업계획서와 대조한다.
7. 근거가 없는 값은 빈 문자열로 채우지 말고 `[입력 필요: 항목]`으로 표시해 사용자 확인을 받는다.
