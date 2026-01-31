<!-- Sync Impact Report:
Version change: 1.0.0 -> 1.1.0
List of modified principles:
  - Added: 디렉터리 구조 및 협업 원칙 (Collaboration)
Modified sections:
  - Core Principles
Added sections:
  - None
Removed sections:
  - None
Templates requiring updates:
  - .specify/templates/plan-template.md: ✅ updated
  - .specify/templates/spec-template.md: ✅ updated
  - .specify/templates/tasks-template.md: ✅ updated
  - .specify/commands/speckit.analyze.toml: ✅ updated
  - .specify/commands/speckit.checklist.toml: ✅ updated
  - .specify/commands/speckit.clarify.toml: ✅ updated
  - .specify/commands/speckit.constitution.toml: ✅ updated
  - .specify/commands/speckit.implement.toml: ✅ updated
  - .specify/commands/speckit.plan.toml: ✅ updated
  - .specify/commands/speckit.specify.toml: ✅ updated
  - .specify/commands/speckit.tasks.toml: ✅ updated
  - .specify/commands/speckit.taskstoissues.toml: ✅ updated
  - README.md: ⚠ pending
Follow-up TODOs: None
-->
# Frontend Project Constitution

## Core Principles

### 0. 디렉터리 구조 및 협업 원칙 (Collaboration)
- **작업 범위:** 모든 프론트엔드(React) 작업은 반드시 `./Frontend` 디렉터리 내에서만 이루어져야 한다.
- **백엔드 분리:** AI 에이전트(Gemini)는 백엔드 관련 파일이나 디렉터리(예: `Backend` 디렉터리)를 **절대 수정하거나 참조하지 않는다.**
- **통신 원칙:** 백엔드와의 연동은 오직 API를 통해서만 이루어지며, API 명세는 `/speckit.plan` 단계에서 별도로 정의한다.

### I. Tech Stack & Architecture
- **Frontend:** React (Vite), JavaScript (ES6+).
- **Backend:** Java Spring Boot (API 연동을 가정하고 프론트엔드 작성).
- **Styling:** CSS Modules 또는 일반 CSS 사용 (복잡한 라이브러리 지양).
- **Package Manager:** npm 사용.

### II. Coding Standards
- **React:** 모든 컴포넌트는 **Functional Component**와 **Hooks**를 사용한다. (Class 컴포넌트 금지)
- **Naming:** 변수와 함수명은 영어로 명확하게(camelCase), 컴포넌트는 PascalCase로 작성한다.
- **Language:** 코드 내 변수명은 영어, **주석과 문서는 한국어**로 작성한다.

### III. Code Quality & Maintenance
- 코드는 간결하고 읽기 쉽게 작성한다 (Clean Code).
- 불필요한 중복을 피하고 재사용 가능한 컴포넌트로 분리한다.
- `console.log`는 디버깅 후 반드시 제거한다.

### IV. UI/UX Principles
- 사용자에게 직관적인 UI를 제공한다.
- 모바일과 데스크탑 환경을 모두 고려한다 (반응형 기본 고려).
- 에러 발생 시 사용자에게 친절한 메시지를 보여준다.

## Additional Constraints

All project dependencies MUST be explicitly declared in `package.json`. External libraries MUST be approved before inclusion.

## Development Workflow

All code changes MUST go through a pull request review process. A minimum of one approval is required before merging to the main branch. Automated tests MUST pass before merging.

## Governance

This Constitution supersedes all other project practices. Amendments require a documented proposal, team approval, and a clear migration plan for any breaking changes. All pull requests and code reviews MUST verify compliance with these principles. Complexity must be justified with clear rationale.

**Version**: 1.1.0 | **Ratified**: 2025-12-12 | **Last Amended**: 2025-12-12
