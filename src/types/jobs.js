/**
 * Job Posting Types
 * OpenAPI 스펙 기반 일자리 관련 타입 정의
 */

/**
 * JobPosting 타입
 * OpenAPI: /components/schemas/JobPosting
 */
export const JobPosting = {
  id: null,
  employer: {
    companyName: '',
  },
  title: '',
  description: '',
  location: '',
  salaryRange: '',
  requiredSkills: [],
  applicationDeadline: null,
  postedDate: null,
  startDate: null,
  startTime: '',
  endTime: '',
  isLongTerm: false,
  industry: '',
  employmentType: '',
  applicantCount: 0,
};

/**
 * JobPostingCreate 타입
 * OpenAPI: /components/schemas/JobPostingCreate
 */
export const JobPostingCreate = {
  title: '',
  description: '',
  location: '',
  salaryRange: '',
  requiredSkills: [],
  applicationDeadline: '',
  startTime: '',
  endTime: '',
  isLongTerm: false,
  industry: '',
  employmentType: '',
};

/**
 * Job Search Filters
 */
export const JobSearchFilters = {
  q: '', // 검색어 (제목 또는 회사명)
  category: '', // 직종 카테고리
  location: '', // 지역
  salaryRange: '', // 급여 범위
  employmentType: '', // 고용 형태
  industry: '', // 산업 분야
};

/**
 * Schedule Matching Result
 * 일정 매칭 결과
 */
export const ScheduleMatchResult = {
  jobPostingId: null,
  matches: [], // 매칭된 일정 배열
  hasSchedule: false, // 일정이 있는지 여부
};

