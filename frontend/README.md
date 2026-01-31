# Time-Fit Frontend

Time-Fit 프론트엔드 레포지토리입니다.

## 개요

Time-Fit은 구직자와 채용자를 연결하는 일자리 매칭 플랫폼입니다. 구직자는 자신의 일정에 맞는 일자리를 찾고 지원할 수 있으며, 채용자는 구인글을 등록하고 지원자를 관리할 수 있습니다.

## 기술 스택

- **React**: 19.2.0
- **React Router DOM**: 7.10.1
- **Vite**: 7.2.4
- **Node.js**: v18 이상 권장

## 빠른 시작

### 사전 요구사항

- Node.js (v18 이상 권장)
- npm 또는 yarn 패키지 매니저

### 설치 및 실행

1. **의존성 설치**:
   ```bash
   npm install
   ```

2. **개발 서버 실행**:
   ```bash
   npm run dev
   ```

   개발 서버는 기본적으로 `http://localhost:5173`에서 실행됩니다. 포트가 사용 중이면 다른 포트가 자동으로 할당됩니다.

3. **프로덕션 빌드**:
   ```bash
   npm run build
   ```

   빌드 결과물은 `dist/` 디렉토리에 생성됩니다.

4. **프로덕션 미리보기**:
   ```bash
   npm run preview
   ```

## 주요 기능

### 구직자 기능

- 일자리 검색 및 필터링
- 일정 기반 자동 매칭
- 일자리 지원
- 일정 관리
- 지원 내역 확인
- 프로필 관리

### 채용자 기능

- 구인글 작성 및 관리
- 지원자 목록 확인
- 지원자 액션 (선택, 인터뷰 요청, 거절)

## 프로젝트 구조

```
src/
├── components/      # 재사용 가능한 컴포넌트
│   ├── auth/       # 인증 관련 컴포넌트
│   ├── employer/   # 채용자 관련 컴포넌트
│   ├── jobs/       # 일자리 관련 컴포넌트
│   └── seeker/     # 구직자 관련 컴포넌트
├── pages/          # 페이지 컴포넌트
├── layouts/        # 레이아웃 컴포넌트
├── services/       # API 서비스 레이어
├── context/        # React Context
├── types/          # 타입 정의
├── utils/          # 유틸리티 함수
└── assets/         # 정적 자산
```

## 스크립트

- `npm run dev`: 개발 서버 실행
- `npm run build`: 프로덕션 빌드
- `npm run preview`: 프로덕션 빌드 미리보기
- `npm run lint`: ESLint 실행
- `npm run format`: Prettier로 코드 포맷팅
- `npm run format:check`: 코드 포맷팅 검사

## 환경 변수

`.env` 파일을 생성하여 다음 환경 변수를 설정할 수 있습니다:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## 테스트

단위 테스트 실행:

```bash
npm test
```

## 문서

더 자세한 문서는 다음을 참고하세요:

- [프로젝트 문서](./docs/README.md)
- [API 명세서](./specs/001-job-portal-frontend/contracts/openapi.yaml)
- [데이터 모델](./specs/001-job-portal-frontend/data-model.md)
- [기능 명세서](./specs/001-job-portal-frontend/spec.md)
- [빠른 시작 가이드](./specs/001-job-portal-frontend/quickstart.md)

## 보안

- 모든 사용자 입력은 `src/utils/inputSanitizer.js`를 통해 sanitize됩니다.
- XSS 공격 방지를 위해 HTML 태그가 자동으로 이스케이프됩니다.
- 이메일, 전화번호 등은 형식 검증을 거칩니다.

## 라이선스

이 프로젝트는 비공개 프로젝트입니다.
