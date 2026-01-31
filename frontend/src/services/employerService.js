/**
 * Employer Service
 * 채용자 구인글 관리 및 지원자 관리 관련 API 호출
 */

import { get, post } from './apiClient';

/**
 * 데모 데이터 - 채용자 구인글 목록
 */
const DEMO_EMPLOYER_JOB_POSTINGS = [
  {
    id: 'emp-1',
    title: '카페 바리스타 모집',
    description: '카페에서 음료 제조 및 서빙 업무를 담당합니다.',
    location: '정왕동',
    salaryRange: '시급 10,000원',
    applicationDeadline: '2024-12-31',
    postedDate: '2024-01-15T10:00:00Z',
    startDate: '2024-02-01',
    startTime: '09:00',
    endTime: '18:00',
    isLongTerm: true,
    industry: '서비스업',
    employmentType: '정규직',
    applicantCount: 12,
    status: 'HIRING', // HIRING: 모집 중, MATCHED: 매칭 완료
  },
  {
    id: 'emp-2',
    title: '주방 보조 직원',
    description: '주방 보조 업무를 담당합니다.',
    location: '은행동',
    salaryRange: '시급 9,500원',
    applicationDeadline: '2024-12-25',
    postedDate: '2024-01-10T09:00:00Z',
    startDate: '2024-01-25',
    startTime: '10:00',
    endTime: '19:00',
    isLongTerm: false,
    industry: '요식업',
    employmentType: '파트타임',
    applicantCount: 5,
    status: 'MATCHED',
  },
];

/**
 * 데모 데이터 - 지원자 목록
 */
const DEMO_APPLICANTS = {
  'emp-1': [
    {
      id: 'app-1',
      jobSeeker: {
        name: '홍길동',
        email: 'hong@example.com',
        contact: '010-1234-5678',
      },
      appliedDate: '2024-01-16T10:00:00Z',
      status: 'PENDING', // PENDING, SELECTED, REJECTED, INTERVIEW_REQUESTED
    },
    {
      id: 'app-2',
      jobSeeker: {
        name: '김철수',
        email: 'kim@example.com',
        contact: '010-2345-6789',
      },
      appliedDate: '2024-01-17T11:00:00Z',
      status: 'PENDING',
    },
  ],
  'emp-2': [
    {
      id: 'app-3',
      jobSeeker: {
        name: '이영희',
        email: 'lee@example.com',
        contact: '010-3456-7890',
      },
      appliedDate: '2024-01-11T09:00:00Z',
      status: 'SELECTED',
    },
  ],
};

/**
 * 채용자의 구인글 목록 조회
 * @param {string} status - 구인글 상태 ('HIRING' | 'MATCHED' | null)
 * @param {boolean} useDemo - 데모 데이터 사용 여부 (기본값: true)
 * @returns {Promise<Array>} 구인글 목록
 */
export async function getEmployerJobPostings(status = null, useDemo = true) {
  if (useDemo) {
    await new Promise(resolve => setTimeout(resolve, 300));
    let result = [...DEMO_EMPLOYER_JOB_POSTINGS];
    if (status) {
      result = result.filter(job => job.status === status);
    }
    return result;
  }

  try {
    const queryParams = new URLSearchParams();
    if (status) {
      queryParams.append('status', status);
    }
    const queryString = queryParams.toString();
    const endpoint = `/employer/job-postings${queryString ? `?${queryString}` : ''}`;
    const result = await get(endpoint);
    return Array.isArray(result) ? result : [];
  } catch (error) {
    console.warn('API 호출 실패, 데모 데이터를 사용합니다:', error);
    let result = [...DEMO_EMPLOYER_JOB_POSTINGS];
    if (status) {
      result = result.filter(job => job.status === status);
    }
    return result;
  }
}

/**
 * 구인글 작성
 * @param {Object} jobPostingData - 구인글 데이터
 * @param {boolean} useDemo - 데모 모드 사용 여부 (기본값: true)
 * @returns {Promise<Object>} 생성된 구인글
 */
export async function createJobPosting(jobPostingData, useDemo = true) {
  if (useDemo) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newJob = {
      id: `emp-${Date.now()}`,
      ...jobPostingData,
      postedDate: new Date().toISOString(),
      applicantCount: 0,
      status: 'HIRING',
    };
    DEMO_EMPLOYER_JOB_POSTINGS.unshift(newJob);
    return newJob;
  }

  try {
    return await post('/job-postings', jobPostingData);
  } catch (error) {
    console.warn('API 호출 실패, 데모 응답을 반환합니다:', error);
    const newJob = {
      id: `emp-${Date.now()}`,
      ...jobPostingData,
      postedDate: new Date().toISOString(),
      applicantCount: 0,
      status: 'HIRING',
    };
    DEMO_EMPLOYER_JOB_POSTINGS.unshift(newJob);
    return newJob;
  }
}

/**
 * 특정 구인글의 지원자 목록 조회
 * @param {string} jobPostingId - 구인글 ID
 * @param {boolean} useDemo - 데모 데이터 사용 여부 (기본값: true)
 * @returns {Promise<Array>} 지원자 목록
 */
export async function getApplicants(jobPostingId, useDemo = true) {
  if (useDemo) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return DEMO_APPLICANTS[jobPostingId] || [];
  }

  try {
    return await get(`/employer/applicants/${jobPostingId}`);
  } catch (error) {
    console.warn('API 호출 실패, 데모 데이터를 사용합니다:', error);
    return DEMO_APPLICANTS[jobPostingId] || [];
  }
}

/**
 * 지원자 액션 (선택, 인터뷰 요청 등)
 * @param {string} applicationId - 지원 ID
 * @param {string} action - 액션 타입 ('SELECT', 'REJECT', 'REQUEST_INTERVIEW')
 * @param {boolean} useDemo - 데모 모드 사용 여부 (기본값: true)
 * @returns {Promise<Object>} 액션 결과
 */
export async function updateApplicantStatus(
  applicationId,
  action,
  useDemo = true
) {
  if (useDemo) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      success: true,
      message: '상태가 업데이트되었습니다.',
    };
  }

  try {
    return await post(`/employer/applications/${applicationId}/${action}`, {});
  } catch (error) {
    console.warn('API 호출 실패, 데모 응답을 반환합니다:', error);
    return {
      success: true,
      message: '상태가 업데이트되었습니다. (데모 모드)',
    };
  }
}

