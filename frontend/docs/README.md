# Time-Fit Frontend Documentation

이 문서는 Time-Fit 프론트엔드 애플리케이션의 구조와 주요 기능에 대한 문서입니다.

## 목차

- [프로젝트 개요](#프로젝트-개요)
- [아키텍처](#아키텍처)
- [주요 기능](#주요-기능)
- [컴포넌트 구조](#컴포넌트-구조)
- [서비스 레이어](#서비스-레이어)
- [라우팅](#라우팅)
- [인증 및 권한](#인증-및-권한)

## 프로젝트 개요

Time-Fit은 구직자와 채용자를 연결하는 일자리 매칭 플랫폼입니다. 구직자는 자신의 일정에 맞는 일자리를 찾고 지원할 수 있으며, 채용자는 구인글을 등록하고 지원자를 관리할 수 있습니다.

### 기술 스택

- **프레임워크**: React 19.2.0
- **라우팅**: React Router DOM 7.10.1
- **빌드 도구**: Vite 7.2.4
- **스타일링**: CSS Modules
- **상태 관리**: React Context API

## 아키텍처

프로젝트는 다음과 같은 구조로 구성되어 있습니다:

```
src/
├── components/      # 재사용 가능한 컴포넌트
├── pages/          # 페이지 컴포넌트
├── layouts/        # 레이아웃 컴포넌트
├── services/       # API 서비스 레이어
├── context/        # React Context (인증 등)
├── types/          # 타입 정의
└── assets/         # 정적 자산
```

## 주요 기능

### 구직자 기능

1. **일자리 찾기**: 검색 및 필터링을 통한 일자리 검색
2. **일정 매칭**: 등록한 일정과 일자리 시간이 매칭되는지 확인
3. **일자리 지원**: 관심 있는 일자리에 지원
4. **마이페이지**:
   - 일정 관리: 근무 가능한 시간 등록 및 관리
   - 활동 내역: 지원한 일자리 목록 확인
   - 프로필 관리: 개인정보 수정

### 채용자 기능

1. **구인글 관리**: 구인글 작성, 수정, 삭제
2. **지원자 관리**: 구인글별 지원자 목록 확인 및 액션 (선택, 인터뷰 요청, 거절)
3. **마이페이지**: 구인글 및 지원자 통합 관리

## 컴포넌트 구조

### 공통 컴포넌트

- `Header`: 상단 네비게이션 헤더
- `Button`: 재사용 가능한 버튼 컴포넌트
- `ButtonList`: 버튼 목록 컴포넌트
- `ErrorDisplay`: 전역 에러 표시 컴포넌트
- `MainLayout`: 공통 레이아웃 컴포넌트

### 인증 컴포넌트

- `EmployerRegistrationForm`: 채용자 회원가입 폼
- `JobSeekerRegistrationForm`: 구직자 회원가입 폼

### 구직자 컴포넌트

- `JobCard`: 일자리 카드 컴포넌트
- `ScheduleForm`: 일정 등록/수정 폼
- `ScheduleTab`: 일정 관리 탭
- `ActivityTab`: 활동 내역 탭
- `SeekerProfileTab`: 프로필 관리 탭

### 채용자 컴포넌트

- `JobPostingCard`: 구인글 카드 컴포넌트
- `JobPostingForm`: 구인글 작성 폼
- `ApplicantActions`: 지원자 액션 버튼 컴포넌트

## 서비스 레이어

### authService.js

인증 관련 API 호출:
- `login(email, password)`: 로그인
- `registerJobSeeker(data)`: 구직자 회원가입
- `registerEmployer(data)`: 채용자 회원가입
- `logout()`: 로그아웃

### jobService.js

일자리 관련 API 호출:
- `getJobPostings(filters)`: 일자리 목록 조회
- `getJobPosting(id)`: 일자리 상세 조회
- `applyToJob(jobPostingId)`: 일자리 지원
- `getSchedules()`: 일정 목록 조회
- `matchSchedule(job, schedules)`: 일정 매칭 로직

### employerService.js

채용자 관련 API 호출:
- `getEmployerJobPostings(status)`: 채용자 구인글 목록 조회
- `createJobPosting(data)`: 구인글 작성
- `getApplicants(jobPostingId)`: 지원자 목록 조회
- `updateApplicantStatus(applicationId, action)`: 지원자 상태 업데이트

## 라우팅

주요 라우트:

- `/`: 홈 페이지
- `/login`: 로그인 페이지
- `/find`: 일자리 찾기 페이지
- `/mypage`: 마이페이지 (역할에 따라 구직자/채용자 분기)
- `/tasks`: 태스크 보드 페이지

## 인증 및 권한

### AuthContext

전역 인증 상태를 관리하는 Context:
- `user`: 현재 로그인한 사용자 정보
- `isAuthenticated`: 인증 여부
- `login(email, password)`: 로그인 함수
- `logout()`: 로그아웃 함수

### 역할 기반 접근

- `JOB_SEEKER`: 구직자 역할
- `EMPLOYER`: 채용자 역할

역할에 따라 다른 마이페이지와 기능이 제공됩니다.

## 개발 가이드

### 개발 서버 실행

```bash
npm run dev
```

### 프로덕션 빌드

```bash
npm run build
```

### 코드 포맷팅

```bash
npm run format
```

### 린팅

```bash
npm run lint
```

## 추가 정보

더 자세한 정보는 다음 문서를 참고하세요:

- [API 명세서](../specs/001-job-portal-frontend/contracts/openapi.yaml)
- [데이터 모델](../specs/001-job-portal-frontend/data-model.md)
- [기능 명세서](../specs/001-job-portal-frontend/spec.md)

