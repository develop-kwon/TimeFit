/**
 * Job Service
 * 일자리 검색, 필터링, 지원 관련 API 호출
 */

import { get, post } from './apiClient';

/**
 * 데모 데이터 - 일자리 목록
 */
const DEMO_JOB_POSTINGS = [
  {
    id: '1',
    employer: {
      companyName: '스타벅스 코리아',
    },
    title: '카페 바리스타 모집',
    description: '카페에서 음료 제조 및 서빙 업무를 담당합니다. 친절하고 성실한 분을 찾습니다.',
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
  },
  {
    id: '2',
    employer: {
      companyName: '맥도날드',
    },
    title: '주방 및 홀 서비스 직원',
    description: '주방 및 홀 서비스 업무를 담당합니다. 빠른 업무 처리와 친절한 서비스가 가능한 분을 찾습니다.',
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
    applicantCount: 8,
  },
  {
    id: '3',
    employer: {
      companyName: 'GS25 편의점',
    },
    title: '편의점 야간 근무 직원',
    description: '편의점에서 야간 근무를 담당합니다. 밤 근무가 가능하고 책임감 있는 분을 찾습니다.',
    location: '대야동',
    salaryRange: '시급 12,000원',
    applicationDeadline: '2024-12-20',
    postedDate: '2024-01-08T14:00:00Z',
    startDate: '2024-01-20',
    startTime: '22:00',
    endTime: '06:00',
    isLongTerm: true,
    industry: '판매/유통',
    employmentType: '정규직',
    applicantCount: 5,
  },
  {
    id: '4',
    employer: {
      companyName: '롯데백화점',
    },
    title: '백화점 판매직원',
    description: '의류 매장에서 판매 및 고객 상담 업무를 담당합니다. 친절하고 성실한 분을 찾습니다.',
    location: '신천동',
    salaryRange: '월급 2,500,000원',
    applicationDeadline: '2024-12-28',
    postedDate: '2024-01-12T11:00:00Z',
    startDate: '2024-02-05',
    startTime: '10:00',
    endTime: '20:00',
    isLongTerm: true,
    industry: '판매/유통',
    employmentType: '정규직',
    applicantCount: 25,
  },
  {
    id: '5',
    employer: {
      companyName: 'CU 편의점',
    },
    title: '편의점 주간 근무 직원',
    description: '편의점에서 주간 근무를 담당합니다. 친절하고 성실한 분을 찾습니다.',
    location: '신현동',
    salaryRange: '시급 9,000원',
    applicationDeadline: '2024-12-22',
    postedDate: '2024-01-05T08:00:00Z',
    startDate: '2024-01-18',
    startTime: '08:00',
    endTime: '17:00',
    isLongTerm: false,
    industry: '판매/유통',
    employmentType: '계약직',
    applicantCount: 15,
  },
  {
    id: '6',
    employer: {
      companyName: '이마트',
    },
    title: '마트 상품 진열 및 관리',
    description: '마트에서 상품 진열 및 관리 업무를 담당합니다. 체력이 좋고 성실한 분을 찾습니다.',
    location: '매화동',
    salaryRange: '시급 10,500원',
    applicationDeadline: '2024-12-30',
    postedDate: '2024-01-14T13:00:00Z',
    startDate: '2024-02-10',
    startTime: '07:00',
    endTime: '16:00',
    isLongTerm: true,
    industry: '판매/유통',
    employmentType: '정규직',
    applicantCount: 18,
  },
  {
    id: '7',
    employer: {
      companyName: '배달의민족',
    },
    title: '배달 기사 모집',
    description: '배달 업무를 담당합니다. 오토바이 또는 자전거 운전이 가능한 분을 찾습니다.',
    location: '목감동',
    salaryRange: '건당 3,000원 ~ 5,000원',
    applicationDeadline: '2024-12-15',
    postedDate: '2024-01-03T10:00:00Z',
    startDate: '2024-01-15',
    startTime: '11:00',
    endTime: '21:00',
    isLongTerm: false,
    industry: '운송업',
    employmentType: '일용직',
    applicantCount: 30,
  },
  {
    id: '8',
    employer: {
      companyName: '코딩학원',
    },
    title: '프로그래밍 강사 보조',
    description: '프로그래밍 강사 보조 업무를 담당합니다. 프로그래밍 기초 지식이 있는 분을 찾습니다.',
    location: '군자동',
    salaryRange: '시급 15,000원',
    applicationDeadline: '2024-12-27',
    postedDate: '2024-01-11T15:00:00Z',
    startDate: '2024-02-01',
    startTime: '14:00',
    endTime: '20:00',
    isLongTerm: true,
    industry: 'IT/기술',
    employmentType: '파트타임',
    applicantCount: 7,
  },
  {
    id: '9',
    employer: {
      companyName: '건설 현장',
    },
    title: '건설 현장 보조 작업원',
    description: '건설 현장에서 보조 작업을 담당합니다. 체력이 좋고 안전 수칙을 준수할 수 있는 분을 찾습니다.',
    location: '과림동',
    salaryRange: '일급 120,000원',
    applicationDeadline: '2024-12-18',
    postedDate: '2024-01-06T07:00:00Z',
    startDate: '2024-01-22',
    startTime: '08:00',
    endTime: '17:00',
    isLongTerm: false,
    industry: '건설업',
    employmentType: '일용직',
    applicantCount: 10,
  },
  {
    id: '10',
    employer: {
      companyName: '카페베네',
    },
    title: '카페 서버 및 주방 보조',
    description: '카페에서 서버 및 주방 보조 업무를 담당합니다. 친절하고 빠른 업무 처리가 가능한 분을 찾습니다.',
    location: '연성동',
    salaryRange: '시급 9,500원',
    applicationDeadline: '2024-12-23',
    postedDate: '2024-01-09T12:00:00Z',
    startDate: '2024-01-28',
    startTime: '09:00',
    endTime: '18:00',
    isLongTerm: true,
    industry: '요식업',
    employmentType: '정규직',
    applicantCount: 14,
  },
];

/**
 * 데모 데이터 필터링 함수
 */
function filterDemoJobs(jobs, filters) {
  let filtered = [...jobs];

  // 검색어 필터 (제목 또는 회사명)
  if (filters.q) {
    const query = filters.q.toLowerCase();
    filtered = filtered.filter(
      job =>
        job.title.toLowerCase().includes(query) ||
        job.employer.companyName.toLowerCase().includes(query)
    );
  }

  // 직종 필터
  if (filters.category) {
    filtered = filtered.filter(job => job.industry === filters.category);
  }

  // 지역 필터
  if (filters.location) {
    filtered = filtered.filter(job => job.location === filters.location);
  }

  // 고용 형태 필터
  if (filters.employmentType) {
    filtered = filtered.filter(
      job => job.employmentType === filters.employmentType
    );
  }

  return filtered;
}

/**
 * 일자리 목록 조회 (검색 및 필터링)
 * @param {Object} filters - 검색 필터
 * @param {string} filters.q - 검색어 (제목 또는 회사명)
 * @param {string} filters.category - 직종 카테고리
 * @param {string} filters.location - 지역
 * @param {string} filters.salaryRange - 급여 범위
 * @param {string} filters.employmentType - 고용 형태
 * @param {string} filters.industry - 산업 분야
 * @param {boolean} useDemo - 데모 데이터 사용 여부 (기본값: true)
 * @returns {Promise<Array>} 일자리 목록
 */
export async function getJobPostings(filters = {}, useDemo = true) {
  // 데모 모드인 경우 데모 데이터 반환
  if (useDemo) {
    // 약간의 지연을 추가하여 실제 API 호출처럼 보이게 함
    await new Promise(resolve => setTimeout(resolve, 300));
    const result = filterDemoJobs(DEMO_JOB_POSTINGS, filters);
    return Array.isArray(result) ? result : [];
  }

  // 실제 API 호출
  try {
    const queryParams = new URLSearchParams();
    
    // 필터 파라미터 추가
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        queryParams.append(key, filters[key]);
      }
    });

    const queryString = queryParams.toString();
    const endpoint = `/job-postings${queryString ? `?${queryString}` : ''}`;
    
    const result = await get(endpoint);
    // 결과가 배열인지 확인
    return Array.isArray(result) ? result : [];
  } catch (error) {
    // API 호출 실패 시 데모 데이터 반환
    console.warn('API 호출 실패, 데모 데이터를 사용합니다:', error);
    const result = filterDemoJobs(DEMO_JOB_POSTINGS, filters);
    return Array.isArray(result) ? result : [];
  }
}

/**
 * 특정 일자리 상세 조회
 * @param {string} id - 일자리 ID
 * @returns {Promise<Object>} 일자리 상세 정보
 */
export async function getJobPosting(id) {
  return get(`/job-postings/${id}`);
}

/**
 * 일자리 지원
 * @param {string} jobPostingId - 일자리 ID
 * @param {boolean} useDemo - 데모 모드 사용 여부 (기본값: true)
 * @returns {Promise<Object>} 지원 결과
 */
export async function applyToJob(jobPostingId, useDemo = true) {
  // 데모 모드인 경우 성공 응답 반환
  if (useDemo) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      success: true,
      message: '지원이 완료되었습니다.',
      applicationId: `demo-${jobPostingId}-${Date.now()}`,
    };
  }

  // 실제 API 호출
  try {
    return await post(`/job-postings/${jobPostingId}/apply`, {});
  } catch (error) {
    // API 호출 실패 시 데모 응답 반환
    console.warn('API 호출 실패, 데모 응답을 반환합니다:', error);
    return {
      success: true,
      message: '지원이 완료되었습니다. (데모 모드)',
      applicationId: `demo-${jobPostingId}-${Date.now()}`,
    };
  }
}

/**
 * 데모 일정 데이터
 */
const DEMO_SCHEDULES = [
  {
    id: '1',
    date: '2024-02-01',
    startTime: '09:00',
    endTime: '18:00',
    isAvailable: true,
  },
  {
    id: '2',
    date: '2024-01-25',
    startTime: '10:00',
    endTime: '19:00',
    isAvailable: true,
  },
  {
    id: '3',
    date: '2024-01-20',
    startTime: '22:00',
    endTime: '06:00',
    isAvailable: true,
  },
  {
    id: '4',
    date: '2024-02-05',
    startTime: '10:00',
    endTime: '20:00',
    isAvailable: true,
  },
];

/**
 * 구직자의 일정 목록 조회 (일정 매칭용)
 * @param {boolean} useDemo - 데모 모드 사용 여부 (기본값: true)
 * @returns {Promise<Array>} 일정 목록
 */
export async function getSchedules(useDemo = true) {
  // 데모 모드인 경우 데모 데이터 반환
  if (useDemo) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return Array.isArray(DEMO_SCHEDULES) ? DEMO_SCHEDULES : [];
  }

  // 실제 API 호출
  try {
    const result = await get('/schedules');
    return Array.isArray(result) ? result : [];
  } catch (error) {
    // API 호출 실패 시 데모 데이터 반환
    console.warn('API 호출 실패, 데모 데이터를 사용합니다:', error);
    return Array.isArray(DEMO_SCHEDULES) ? DEMO_SCHEDULES : [];
  }
}

/**
 * 일정 생성
 * @param {Object} scheduleData - 일정 데이터
 * @param {boolean} useDemo - 데모 모드 사용 여부 (기본값: true)
 * @returns {Promise<Object>} 생성된 일정
 */
export async function createSchedule(scheduleData, useDemo = true) {
  // 데모 모드인 경우 성공 응답 반환
  if (useDemo) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      ...scheduleData,
      id: `demo-schedule-${Date.now()}`,
    };
  }

  // 실제 API 호출
  try {
    return await post('/schedules', scheduleData);
  } catch (error) {
    console.warn('API 호출 실패:', error);
    throw error;
  }
}

/**
 * 일정 업데이트
 * @param {string} scheduleId - 일정 ID
 * @param {Object} scheduleData - 일정 데이터
 * @param {boolean} useDemo - 데모 모드 사용 여부 (기본값: true)
 * @returns {Promise<Object>} 업데이트된 일정
 */
export async function updateSchedule(scheduleId, scheduleData, useDemo = true) {
  // 데모 모드인 경우 성공 응답 반환
  if (useDemo) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      ...scheduleData,
      id: scheduleId,
    };
  }

  // 실제 API 호출 (일반적으로 PUT이나 PATCH 사용)
  try {
    return await post(`/schedules/${scheduleId}`, scheduleData);
  } catch (error) {
    console.warn('API 호출 실패:', error);
    throw error;
  }
}

/**
 * 일정 삭제
 * @param {string} scheduleId - 일정 ID
 * @param {boolean} useDemo - 데모 모드 사용 여부 (기본값: true)
 * @returns {Promise<void>}
 */
export async function deleteSchedule(scheduleId, useDemo = true) {
  // 데모 모드인 경우 성공 응답 반환
  if (useDemo) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return;
  }

  // 실제 API 호출
  try {
    // DELETE 메서드를 사용한다고 가정 (apiClient에 delete가 있다면)
    // 여기서는 post를 사용하거나 apiClient를 확장해야 할 수 있음
    return await post(`/schedules/${scheduleId}/delete`, {});
  } catch (error) {
    console.warn('API 호출 실패:', error);
    throw error;
  }
}

/**
 * 데모 지원 내역 데이터
 */
const DEMO_APPLICATIONS = [
  {
    id: '1',
    jobPostingId: '1',
    jobPosting: {
      id: '1',
      title: '카페 바리스타 모집',
      employer: { companyName: '스타벅스 코리아' },
      location: '정왕동',
      salaryRange: '시급 10,000원',
    },
    applicationDate: '2024-01-20T10:00:00Z',
    status: 'Submitted',
  },
  {
    id: '2',
    jobPostingId: '2',
    jobPosting: {
      id: '2',
      title: '주방 및 홀 서비스 직원',
      employer: { companyName: '맥도날드' },
      location: '은행동',
      salaryRange: '시급 9,500원',
    },
    applicationDate: '2024-01-18T14:30:00Z',
    status: 'Screening',
  },
];

/**
 * 구직자의 지원 내역 조회
 * @param {boolean} useDemo - 데모 모드 사용 여부 (기본값: true)
 * @returns {Promise<Array>} 지원 내역 목록
 */
export async function getMyActivity(useDemo = true) {
  // 데모 모드인 경우 데모 데이터 반환
  if (useDemo) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return Array.isArray(DEMO_APPLICATIONS) ? DEMO_APPLICATIONS : [];
  }

  // 실제 API 호출
  try {
    const result = await get('/my-activity');
    return Array.isArray(result) ? result : [];
  } catch (error) {
    // API 호출 실패 시 데모 데이터 반환
    console.warn('API 호출 실패, 데모 데이터를 사용합니다:', error);
    return Array.isArray(DEMO_APPLICATIONS) ? DEMO_APPLICATIONS : [];
  }
}

/**
 * 일정 매칭 로직
 * 일자리의 시간과 구직자의 일정을 비교하여 매칭 여부 확인
 * @param {Object} jobPosting - 일자리 정보
 * @param {Array} schedules - 구직자의 일정 목록
 * @returns {Object} 매칭 결과
 */
export function matchSchedule(jobPosting, schedules) {
  if (!schedules || schedules.length === 0) {
    return {
      hasSchedule: false,
      matches: [],
      message: '등록된 일정이 없습니다. 마이페이지에서 일정을 등록해주세요.',
    };
  }

  const matches = [];
  const jobDate = jobPosting.startDate;
  const jobStartTime = jobPosting.startTime;
  const jobEndTime = jobPosting.endTime;

  // 일정이 있는 경우 매칭 확인
  schedules.forEach(schedule => {
    if (
      schedule.isAvailable &&
      schedule.date === jobDate &&
      schedule.startTime <= jobStartTime &&
      schedule.endTime >= jobEndTime
    ) {
      matches.push(schedule);
    }
  });

  // 우선순위 정렬 (시간이 가까운 순서)
  matches.sort((a, b) => {
    if (a.date !== b.date) {
      return new Date(a.date) - new Date(b.date);
    }
    return a.startTime.localeCompare(b.startTime);
  });

  return {
    hasSchedule: true,
    matches,
    message: matches.length > 0 
      ? `${matches.length}개의 일정이 매칭되었습니다.`
      : '일정이 매칭되지 않았습니다. 다른 일정을 확인해주세요.',
  };
}

