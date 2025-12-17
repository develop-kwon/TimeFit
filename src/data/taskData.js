export const overview = {
  description:
    'Task list for the 구직자 및 채용자 서비스 Frontend 개발 feature.',
  input: 'Design documents from `/specs/001-job-portal-frontend/`',
  prerequisites: [
    'plan.md (required)',
    'spec.md (required for user stories)',
    'research.md',
    'data-model.md',
    'contracts/openapi.yaml',
  ],
  tests: 'Tests are included as optional tasks if they can be derived from contract tests or integration scenarios.',
  organization:
    'Tasks are grouped by phase and user story to enable independent implementation and testing of each story.',
};

export const pathConventions = {
  webApp: 'frontend/src/',
  tests: 'frontend/tests/',
};

export const phases = [
  {
    id: 'phase1',
    title: 'Phase 1: Setup (Shared Infrastructure)',
    purpose: 'Project initialization and basic structure',
    priority: 'Setup',
    tasks: [
      {
        id: 'T001',
        description: 'Create project structure per implementation plan.',
        path: './frontend/',
      },
      {
        id: 'T002',
        description:
          'Initialize JavaScript/TypeScript project with Vite and React dependencies.',
        path: './frontend/',
      },
      {
        id: 'T003',
        parallel: true,
        description: 'Configure linting and formatting tools.',
        path: './frontend/.eslintrc.cjs, ./frontend/.prettierrc.cjs',
      },
    ],
  },
  {
    id: 'phase2',
    title: 'Phase 2: Foundational (Blocking Prerequisites)',
    purpose:
      'Core infrastructure that must be complete before any user story can be implemented.',
    priority: 'Blocking',
    tasks: [
      {
        id: 'T004',
        description: 'Setup base React Router configuration.',
        path: './frontend/src/App.jsx',
      },
      {
        id: 'T005',
        parallel: true,
        description: 'Implement JWT-based authentication service and context.',
        path: './frontend/src/services/authService.js, ./frontend/src/context/AuthContext.jsx',
      },
      {
        id: 'T006',
        parallel: true,
        description: 'Setup API client configuration for RESTful API.',
        path: './frontend/src/services/apiClient.js',
      },
      {
        id: 'T007',
        description: 'Create base models/entities that all stories depend on.',
        path: './frontend/src/types/',
      },
      {
        id: 'T008',
        description: 'Configure global error handling and display mechanism.',
        path: './frontend/src/components/ErrorDisplay.jsx, ./frontend/src/App.jsx',
      },
      {
        id: 'T009',
        description: 'Setup environment configuration management.',
        path: './frontend/.env',
      },
    ],
    checkpoint: 'Foundation ready - user story implementation can now begin in parallel.',
  },
  {
    id: 'phase3',
    title: 'Phase 3: User Story 1 - 회원가입 (Sign Up) 🎯 MVP',
    purpose: 'Enable job seekers and employers to sign up.',
    priority: 'P1',
    goal: 'Successful sign-up for both roles, login, and access to respective main pages.',
    tests: [
      {
        id: 'T010',
        parallel: true,
        story: 'US1',
        description: 'Contract test for `/auth/register` endpoint.',
        path: './frontend/tests/contract/auth.test.js',
      },
      {
        id: 'T011',
        parallel: true,
        story: 'US1',
        description: 'Integration test for the entire sign-up flow (UI to API).',
        path: './frontend/tests/integration/signup.test.js',
      },
    ],
    tasks: [
      {
        id: 'T012',
        parallel: true,
        story: 'US1',
        description: 'Create `User` and role-specific registration schemas/types.',
        path: './frontend/src/types/auth.ts',
      },
      {
        id: 'T013',
        story: 'US1',
        description: 'Implement `JobSeekerRegistration` form component.',
        path: './frontend/src/components/auth/JobSeekerRegistrationForm.jsx',
      },
      {
        id: 'T014',
        story: 'US1',
        description: 'Implement `EmployerRegistration` form component.',
        path: './frontend/src/components/auth/EmployerRegistrationForm.jsx',
      },
      {
        id: 'T015',
        story: 'US1',
        description:
          'Implement sign-up page component integrating forms and auth service.',
        path: './frontend/src/pages/auth/SignUpPage.jsx',
      },
      {
        id: 'T016',
        story: 'US1',
        description:
          'Add validation and error handling for sign-up forms.',
        path: './frontend/src/components/auth/JobSeekerRegistrationForm.jsx, ./frontend/src/components/auth/EmployerRegistrationForm.jsx',
      },
      {
        id: 'T017',
        story: 'US1',
        description: 'Implement navigation to login and demo mode toggle.',
        path: './frontend/src/pages/auth/SignUpPage.jsx',
      },
    ],
    checkpoint: 'User Story 1 fully functional and testable independently.',
  },
  {
    id: 'phase4',
    title: 'Phase 4: User Story 2 - 구직자 일자리 찾기 및 지원',
    purpose: 'Allow job seekers to search, filter, and apply for jobs.',
    priority: 'P1',
    goal: 'Search, filter, schedule matching, and apply functionality.',
    tests: [
      {
        id: 'T018',
        parallel: true,
        story: 'US2',
        description:
          'Contract test for `/job-postings` GET and `/job-postings/{id}/apply` POST endpoints.',
        path: './frontend/tests/contract/jobs.test.js',
      },
      {
        id: 'T019',
        parallel: true,
        story: 'US2',
        description:
          'Integration test for job search, filtering, and application flow.',
        path: './frontend/tests/integration/jobSearchApply.test.js',
      },
    ],
    tasks: [
      {
        id: 'T020',
        story: 'US2',
        description: 'Implement `JobPosting` model/interface.',
        path: './frontend/src/types/jobs.ts',
      },
      {
        id: 'T021',
        story: 'US2',
        description: 'Implement job search and filtering service.',
        path: './frontend/src/services/jobService.js',
      },
      {
        id: 'T022',
        story: 'US2',
        description:
          'Create `JobSearchPage` component with search bar and filters.',
        path: './frontend/src/pages/job/JobSearchPage.jsx',
      },
      {
        id: 'T023',
        story: 'US2',
        description: 'Implement `JobCard` component.',
        path: './frontend/src/components/jobs/JobCard.jsx',
      },
      {
        id: 'T024',
        story: 'US2',
        description:
          'Implement "Apply" button functionality and state update.',
        path: './frontend/src/components/jobs/JobCard.jsx',
      },
      {
        id: 'T025',
        story: 'US2',
        description:
          'Implement schedule matching logic display (message for no schedule, prioritized list).',
        path: './frontend/src/pages/job/JobSearchPage.jsx',
      },
    ],
    checkpoint: 'User Story 1 and 2 work independently.',
  },
  {
    id: 'phase5',
    title: 'Phase 5: User Story 3 - 구직자 마이페이지 관리',
    purpose: 'Allow job seekers to manage schedules, view activity, and edit profile.',
    priority: 'P2',
    goal: 'Schedule management, activity log, and profile editing.',
    tests: [
      {
        id: 'T026',
        parallel: true,
        story: 'US3',
        description: 'Contract test for `/schedules` and `/users/me` endpoints.',
        path: './frontend/tests/contract/myPage.test.js',
      },
      {
        id: 'T027',
        parallel: true,
        story: 'US3',
        description:
          'Integration test for schedule management and profile update.',
        path: './frontend/tests/integration/myPage.test.js',
      },
    ],
    tasks: [
      {
        id: 'T028',
        parallel: true,
        story: 'US3',
        description:
          'Implement `Schedule` model/interface and create/update component/modal.',
        path: './frontend/src/types/schedule.ts, ./frontend/src/components/myPage/ScheduleForm.jsx',
      },
      {
        id: 'T029',
        story: 'US3',
        description: 'Implement `MyPage` layout with tabs (Schedule, Activity, Profile).',
        path: './frontend/src/pages/myPage/MyPageLayout.jsx',
      },
      {
        id: 'T030',
        story: 'US3',
        description: "Implement 'Schedule' tab functionality.",
        path: './frontend/src/pages/myPage/ScheduleTab.jsx',
      },
      {
        id: 'T031',
        story: 'US3',
        description: "Implement 'Activity' tab to display applications.",
        path: './frontend/src/pages/myPage/ActivityTab.jsx',
      },
      {
        id: 'T032',
        story: 'US3',
        description: "Implement 'Profile' tab for viewing and editing user info.",
        path: './frontend/src/pages/myPage/ProfileTab.jsx',
      },
    ],
    checkpoint: 'All user stories independently functional.',
  },
  {
    id: 'phase6',
    title: 'Phase 6: User Story 4 - 채용자 구인글 관리',
    purpose: 'Allow employers to view, create, and manage job postings.',
    priority: 'P1',
    goal: 'Job posting creation and management.',
    tests: [
      {
        id: 'T033',
        parallel: true,
        story: 'US4',
        description:
          'Contract test for `/job-postings` POST and GET endpoints.',
        path: './frontend/tests/contract/employerJobs.test.js',
      },
      {
        id: 'T034',
        parallel: true,
        story: 'US4',
        description: 'Integration test for job posting creation and listing.',
        path: './frontend/tests/integration/employerJobMgmt.test.js',
      },
    ],
    tasks: [
      {
        id: 'T035',
        story: 'US4',
        description: 'Implement `JobPostingCreate` form component.',
        path: './frontend/src/components/employer/JobPostingForm.jsx',
      },
      {
        id: 'T036',
        story: 'US4',
        description:
          "Implement `EmployerJobManagementPage` with tabs for 'Currently Hiring' and 'Matched'.",
        path: './frontend/src/pages/employer/EmployerJobMgmtPage.jsx',
      },
      {
        id: 'T037',
        story: 'US4',
        description:
          'Implement logic to display job postings with applicant count.',
        path: './frontend/src/components/employer/JobPostingCard.jsx',
      },
      {
        id: 'T038',
        story: 'US4',
        description:
          'Implement functionality for creating and registering new job postings.',
        path: './frontend/src/pages/employer/EmployerJobMgmtPage.jsx',
      },
    ],
  },
  {
    id: 'phase7',
    title: 'Phase 7: User Story 5 - 채용자 지원자 관리',
    purpose: 'Allow employers to view applicants per job posting and take actions.',
    priority: 'P2',
    goal: 'Viewing applicants and performing actions.',
    tests: [
      {
        id: 'T039',
        parallel: true,
        story: 'US5',
        description:
          'Contract test for `/employer/applicants/{jobPostingId}` endpoint.',
        path: './frontend/tests/contract/employerApplicants.test.js',
      },
      {
        id: 'T040',
        parallel: true,
        story: 'US5',
        description:
          'Integration test for viewing applicant list and taking actions.',
        path: './frontend/tests/integration/employerApplicantMgmt.test.js',
      },
    ],
    tasks: [
      {
        id: 'T041',
        story: 'US5',
        description:
          'Implement `EmployerApplicantManagementPage` to list job postings.',
        path: './frontend/src/pages/employer/EmployerApplicantMgmtPage.jsx',
      },
      {
        id: 'T042',
        story: 'US5',
        description:
          'Implement functionality to view applicants for a selected job posting.',
        path: './frontend/src/pages/employer/EmployerApplicantDetailView.jsx',
      },
      {
        id: 'T043',
        story: 'US5',
        description:
          'Implement UI for candidate actions (e.g., interview request).',
        path: './frontend/src/components/employer/ApplicantActions.jsx',
      },
    ],
  },
  {
    id: 'phaseN',
    title: 'Phase N: Polish & Cross-Cutting Concerns',
    purpose: 'Improvements that affect multiple user stories.',
    priority: 'Polish',
    tasks: [
      {
        id: 'T044',
        parallel: true,
        description: 'Documentation updates.',
        path: './docs/',
      },
      {
        id: 'T045',
        description: 'Code cleanup and refactoring across the codebase.',
      },
      {
        id: 'T046',
        description: 'Performance optimization for key interactions (search, page loads).',
      },
      {
        id: 'T047',
        parallel: true,
        description:
          'Additional unit tests for shared components and utilities.',
        path: './frontend/tests/unit/',
      },
      {
        id: 'T048',
        description: 'Security hardening (e.g., input sanitization, dependency checks).',
      },
      {
        id: 'T049',
        description: 'Run `quickstart.md` validation.',
        path: './frontend/README.md',
      },
    ],
  },
];

export const dependencies = {
  phaseDependencies: [
    'Setup (Phase 1): No dependencies - can start immediately.',
    'Foundational (Phase 2): Depends on Setup completion - blocks all user stories.',
    'User Stories (Phase 3-7): Depend on Foundational phase completion, then can run in parallel or by priority (P1 → P2 → P3).',
    'Polish (Phase N): Depends on all desired user stories being complete.',
  ],
  withinStory: [
    'Tests (if included) must be written and fail before implementation.',
    'Models before services.',
    'Services before endpoints.',
    'Core implementation before integration.',
    'Story complete before moving to next priority.',
  ],
  parallelOpportunities: [
    'Setup tasks marked [P] can run in parallel.',
    'Foundational tasks marked [P] can run in parallel (within Phase 2).',
    'Once foundational is done, all user stories can start in parallel.',
    'Tests for a story marked [P] can run in parallel.',
    'Models within a story marked [P] can run in parallel.',
    'Different user stories can be worked on in parallel by different team members.',
  ],
};

export const strategy = {
  mvpFirst: [
    'Complete Phase 1: Setup.',
    'Complete Phase 2: Foundational (blocks all stories).',
    'Complete Phase 3: User Story 1.',
    'Complete Phase 4: User Story 2.',
    'Complete Phase 6: User Story 4.',
    'Stop and validate MVP stories independently.',
  ],
  incrementalDelivery: [
    'Complete Setup + Foundational → Foundation ready.',
    'Add User Story 1 → Test independently → Deploy/Demo (MVP).',
    'Add User Story 2 → Test independently → Deploy/Demo.',
    'Add User Story 4 → Test independently → Deploy/Demo.',
    'Add User Story 3 → Test independently → Deploy/Demo.',
    'Add User Story 5 → Test independently → Deploy/Demo.',
  ],
  parallelTeam: [
    'Team completes Setup + Foundational together.',
    'After foundational: Developer A: User Story 1; Developer B: User Story 2; Developer C: User Story 4; Developer D: User Story 3; Developer E: User Story 5.',
    'Stories complete and integrate independently.',
  ],
  notes: [
    '[P] tasks = different files, no dependencies.',
    'Each user story should be independently completable and testable.',
    'Verify tests fail before implementing.',
    'Commit after each task or logical group.',
    'Stop at any checkpoint to validate story independently.',
    'Avoid vague tasks, file conflicts, and cross-story dependencies that break independence.',
  ],
};


