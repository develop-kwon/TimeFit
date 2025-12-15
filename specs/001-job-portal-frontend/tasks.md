---

description: "Task list for the 구직자 및 채용자 서비스 Frontend 개발 feature"
---

# Tasks: 구직자 및 채용자 서비스 Frontend 개발

**Input**: Design documents from `/specs/001-job-portal-frontend/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/openapi.yaml

**Tests**: Tests are included as optional tasks if they can be derived from contract tests or integration scenarios.

**Organization**: Tasks are grouped by phase and user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `frontend/src/`, `frontend/tests/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create project structure per implementation plan. Path: `./frontend/`
- [ ] T002 Initialize JavaScript/TypeScript project with Vite and React dependencies. Path: `./frontend/`
- [ ] T003 [P] Configure linting and formatting tools. Paths: `./frontend/.eslintrc.cjs`, `./frontend/.prettierrc.cjs`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Setup base React Router configuration. Path: `./frontend/src/App.jsx`
- [ ] T005 [P] Implement JWT-based authentication service and context. Paths: `./frontend/src/services/authService.js`, `./frontend/src/context/AuthContext.jsx`
- [ ] T006 [P] Setup API client configuration for RESTful API. Path: `./frontend/src/services/apiClient.js`
- [ ] T007 Create base models/entities that all stories depend on. Path: `./frontend/src/types/`
- [ ] T008 Configure global error handling and display mechanism. Paths: `./frontend/src/components/ErrorDisplay.jsx`, `./frontend/src/App.jsx`
- [ ] T009 Setup environment configuration management. Path: `./frontend/.env`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - 회원가입 (Sign Up) (Priority: P1) 🎯 MVP

**Goal**: Enable job seekers and employers to sign up.
**Independent Test**: Successful sign-up for both roles, login, and access to respective main pages.

### Tests for User Story 1 (OPTIONAL) ⚠️

- [ ] T010 [P] [US1] Contract test for `/auth/register` endpoint. Path: `./frontend/tests/contract/auth.test.js`
- [ ] T011 [P] [US1] Integration test for the entire sign-up flow (UI to API). Path: `./frontend/tests/integration/signup.test.js`

### Implementation for User Story 1

- [ ] T012 [P] [US1] Create `User` and role-specific registration schemas/types. Path: `./frontend/src/types/auth.ts`
- [ ] T013 [US1] Implement `JobSeekerRegistration` form component. Path: `./frontend/src/components/auth/JobSeekerRegistrationForm.jsx`
- [ ] T014 [US1] Implement `EmployerRegistration` form component. Path: `./frontend/src/components/auth/EmployerRegistrationForm.jsx`
- [ ] T015 [US1] Implement sign-up page component integrating forms and auth service. Path: `./frontend/src/pages/auth/SignUpPage.jsx`
- [ ] T016 [US1] Add validation and error handling for sign-up forms. Paths: `./frontend/src/components/auth/JobSeekerRegistrationForm.jsx`, `./frontend/src/components/auth/EmployerRegistrationForm.jsx`
- [ ] T017 [US1] Implement navigation to login and demo mode toggle. Path: `./frontend/src/pages/auth/SignUpPage.jsx`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - 구직자 일자리 찾기 및 지원 (Job Seeker Job Search & Apply) (Priority: P1)

**Goal**: Allow job seekers to search, filter, and apply for jobs.
**Independent Test**: Search, filter, schedule matching, and apply functionality.

### Tests for User Story 2 (OPTIONAL) ⚠️

- [ ] T018 [P] [US2] Contract test for `/job-postings` GET and `/job-postings/{id}/apply` POST endpoints. Path: `./frontend/tests/contract/jobs.test.js`
- [ ] T019 [P] [US2] Integration test for job search, filtering, and application flow. Path: `./frontend/tests/integration/jobSearchApply.test.js`

### Implementation for User Story 2

- [ ] T020 [US2] Implement `JobPosting` model/interface. Path: `./frontend/src/types/jobs.ts`
- [ ] T021 [US2] Implement job search and filtering service. Path: `./frontend/src/services/jobService.js`
- [ ] T022 [US2] Create `JobSearchPage` component with search bar and filters. Path: `./frontend/src/pages/job/JobSearchPage.jsx`
- [ ] T023 [US2] Implement `JobCard` component. Path: `./frontend/src/components/jobs/JobCard.jsx`
- [ ] T024 [US2] Implement "Apply" button functionality and state update. Path: `./frontend/src/components/jobs/JobCard.jsx`
- [ ] T025 [US2] Implement schedule matching logic display (message for no schedule, prioritized list). Path: `./frontend/src/pages/job/JobSearchPage.jsx`

**Checkpoint**: At this point, User Story 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - 구직자 마이페이지 관리 (Job Seeker My Page Management) (Priority: P2)

**Goal**: Allow job seekers to manage schedules, view activity, and edit profile.
**Independent Test**: Schedule management, activity log, and profile editing.

### Tests for User Story 3 (OPTIONAL) ⚠️

- [ ] T026 [P] [US3] Contract test for `/schedules` and `/users/me` endpoints. Path: `./frontend/tests/contract/myPage.test.js`
- [ ] T027 [P] [US3] Integration test for schedule management and profile update. Path: `./frontend/tests/integration/myPage.test.js`

### Implementation for User Story 3

- [ ] T028 [P] [US3] Implement `Schedule` model/interface and create/update component/modal. Paths: `./frontend/src/types/schedule.ts`, `./frontend/src/components/myPage/ScheduleForm.jsx`
- [ ] T029 [US3] Implement `MyPage` layout with tabs (Schedule, Activity, Profile). Path: `./frontend/src/pages/myPage/MyPageLayout.jsx`
- [ ] T030 [US3] Implement 'Schedule' tab functionality. Path: `./frontend/src/pages/myPage/ScheduleTab.jsx`
- [ ] T031 [US3] Implement 'Activity' tab to display applications. Path: `./frontend/src/pages/myPage/ActivityTab.jsx`
- [ ] T032 [US3] Implement 'Profile' tab for viewing and editing user info. Path: `./frontend/src/pages/myPage/ProfileTab.jsx`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - 채용자 구인글 관리 (Employer Job Posting Management) (Priority: P1)

**Goal**: Allow employers to view, create, and manage job postings.
**Independent Test**: Job posting creation and management.

### Tests for User Story 4 (OPTIONAL) ⚠️

- [ ] T033 [P] [US4] Contract test for `/job-postings` POST and GET endpoints. Path: `./frontend/tests/contract/employerJobs.test.js`
- [ ] T034 [P] [US4] Integration test for job posting creation and listing. Path: `./frontend/tests/integration/employerJobMgmt.test.js`

### Implementation for User Story 4

- [ ] T035 [US4] Implement `JobPostingCreate` form component. Path: `./frontend/src/components/employer/JobPostingForm.jsx`
- [ ] T036 [US4] Implement `EmployerJobManagementPage` with tabs for 'Currently Hiring' and 'Matched'. Path: `./frontend/src/pages/employer/EmployerJobMgmtPage.jsx`
- [ ] T037 [US4] Implement logic to display job postings with applicant count. Path: `./frontend/src/components/employer/JobPostingCard.jsx`
- [ ] T038 [US4] Implement functionality for creating and registering new job postings. Path: `./frontend/src/pages/employer/EmployerJobMgmtPage.jsx`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 7: User Story 5 - 채용자 지원자 관리 (Employer Applicant Management) (Priority: P2)

**Goal**: Allow employers to view applicants per job posting and take actions.
**Independent Test**: Viewing applicants and performing actions.

### Tests for User Story 5 (OPTIONAL) ⚠️

- [ ] T039 [P] [US5] Contract test for `/employer/applicants/{jobPostingId}` endpoint. Path: `./frontend/tests/contract/employerApplicants.test.js`
- [ ] T040 [P] [US5] Integration test for viewing applicant list and taking actions. Path: `./frontend/tests/integration/employerApplicantMgmt.test.js`

### Implementation for User Story 5

- [ ] T041 [US5] Implement `EmployerApplicantManagementPage` to list job postings. Path: `./frontend/src/pages/employer/EmployerApplicantMgmtPage.jsx`
- [ ] T042 [US5] Implement functionality to view applicants for a selected job posting. Path: `./frontend/src/pages/employer/EmployerApplicantDetailView.jsx`
- [ ] T043 [US5] Implement UI for candidate actions (e.g., interview request). Path: `./frontend/src/components/employer/ApplicantActions.jsx`

**Checkpoint**: All user stories should now be independently functional

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T044 [P] Documentation updates. Path: `./docs/`
- [ ] T045 Code cleanup and refactoring across the codebase.
- [ ] T046 Performance optimization for key interactions (search, page loads).
- [ ] T047 [P] Additional unit tests for shared components and utilities. Path: `./frontend/tests/unit/`
- [ ] T048 Security hardening (e.g., input sanitization, dependency checks).
- [ ] T049 Run `quickstart.md` validation. Path: `./frontend/README.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase N)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable
- **User Story 4 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 5 (P2)**: Can start after Foundational (Phase 2) - May integrate with US4 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Contract test for /auth/register endpoint. Path: ./frontend/tests/contract/auth.test.js"
Task: "Integration test for the entire sign-up flow (UI to API). Path: ./frontend/tests/integration/signup.test.js"

# Launch all models/types for User Story 1 together:
Task: "Create User and role-specific registration schemas/types. Path: ./frontend/src/types/auth.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1, 2, 4)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. Complete Phase 4: User Story 2
5. Complete Phase 6: User Story 4
6. **STOP and VALIDATE**: Test MVP stories independently
7. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 4 → Test independently → Deploy/Demo
5. Add User Story 3 → Test independently → Deploy/Demo
6. Add User Story 5 → Test independently → Deploy/Demo
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 4
   - Developer D: User Story 3
   - Developer E: User Story 5
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
