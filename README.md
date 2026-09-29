# Business Planning Skills

한국어 사업계획서 조사·작성·발표자료 제작을 지원하는 Claude Skill 모음입니다.

## 수록 스킬

- `bizplan-research`: 사업계획서 작성 전 시장·문제·사례·경쟁자 근거 조사
- `bizplan-livinglab`: 주민주도형 마을리빙랩 사업계획서 작성
- `bizplan-kstartup`: K-Startup 표준양식 사업계획서 본문 작성
- `bizplan-kstartup-pitch`: 사업계획서 본문 기반 17장 발표자료 작성

각 스킬 폴더에는 `SKILL.md`와 실행에 필요한 `references/` 자료가 들어 있습니다.

## 패키지 파일

바로 설치할 수 있는 `.skill` 패키지는 [`packages/`](./packages/) 폴더에서 내려받을 수 있습니다.

```text
packages/
├── bizplan-research.skill
├── bizplan-livinglab.skill
├── bizplan-kstartup.skill
└── bizplan-kstartup-pitch.skill
```

## 사용 순서

사업계획서 제작 전체 흐름은 다음 순서를 권장합니다.

```text
bizplan-research → bizplan-kstartup → bizplan-kstartup-pitch
```

마을리빙랩 공모사업은 `bizplan-livinglab`을 별도로 사용합니다.

## 라이선스

별도 라이선스를 부여하지 않았습니다. 저장소가 공개되어 있어도 저작권자의 허락 없이 복제·수정·재배포할 수 없습니다.
