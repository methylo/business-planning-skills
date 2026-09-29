# Business Planning Skills

한국어 사업계획서의 조사·본문 작성·피치덱 제작을 연결하는 Claude 스타일 Agent Skill 모음입니다.

## 수록 스킬

- `bizplan-research`: 시장·문제·사례·자금·경쟁 근거와 사용자 입력을 5종 카드·JSON으로 정리
- `bizplan-livinglab`: 상주시 주민주도형 마을리빙랩 공고용 사업계획서 초안 작성
- `bizplan-kstartup`: K-Startup PSST 12개 소항목 본문 작성
- `bizplan-kstartup-pitch`: 피치 입력 JSON에서 17장 PPTX 생성

권장 순서:

```text
bizplan-research → bizplan-kstartup → bizplan-kstartup-pitch
```

`bizplan-livinglab`은 상주시 해당 사업 전용이며 위 파이프라인과 별도로 사용합니다.

## 설치

`packages/`에서 필요한 `.skill` 파일을 내려받아 Agent Skill을 지원하는 환경에 업로드합니다. 각 패키지는 같은 이름의 단일 최상위 폴더와 `SKILL.md`를 포함합니다.

압축 해제한 소스를 직접 사용할 때는 `<skill-name>/SKILL.md`가 유지되도록 설치합니다.

## 실행 조건

- 공고·시장·정책의 현재 사실은 공식 원문을 확인해야 합니다.
- DOCX 생성은 실행 환경의 문서 생성 기능이 필요합니다. 기능이 없으면 Markdown 초안을 출력합니다.
- 피치덱 생성기는 Node.js와 PptxGenJS 4.0.0이 필요합니다.

피치덱 생성 예시:

```text
cd bizplan-kstartup-pitch
npm install
npm run build -- examples/pitch-input.example.json output.pptx
```

## 검증

```text
python3 -m unittest tests/test_repository.py -v
cd bizplan-kstartup-pitch && npm install && npm test && cd ..
node tests/test_pitch_validation.js
node tests/test_pitch_runtime.js test-output.pptx
python3 tests/verify_pptx.py test-output.pptx
python3 scripts/build_packages.py
python3 -m unittest tests/test_repository.py -v
```

검증 항목은 프런트매터, 누락 참조, 파이프라인 계약, 예산 산식, PPTX 생성, ZIP 구조, 소스·패키지 일치 여부입니다.

## 버전

현재 스킬 묶음 버전은 `1.2.0`입니다.

## 라이선스

별도 재사용 라이선스를 부여하지 않았습니다. 저장소가 공개되어 있어도 저작권자의 허락 없이 복제·수정·재배포할 수 없습니다.
