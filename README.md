# PANIC LINE - 기한 임박 일정 강제 완료 알람기

본 어플리케이션은 **Vercel** 에 즉시 배포할 수 있도록 구성된 초긴급 타임라인 매니저입니다.

## 🚀 배포 방법

1. 다운로드 받은 ZIP 파일의 압축을 해제합니다.
2. Vercel CLI 또는 Vercel GitHub 연동 기능을 사용하여 배포를 개시하십시오.
3. 배포 프로젝트 설정 (Project Settings) -> **Environment Variables** 메뉴로 진입하여 다음 키를 주입합니다:
   - `GEMINI_API_KEY`: [Google AI Studio](https://aistudio.google.com/)에서 취득한 API Key 값

## 🛠️ 개발 가이드 및 구성 정보
- **프론트엔드**: `public/index.html` (Tailwind CSS, 브라우저 Web Audio API 기반 오디오 합성 사이렌 포함)
- **백엔드 (API 엔드포인트)**: `api/generate.js` (Gemini 2.5 Flash 모델 활용한 타임라인 구성 처리)