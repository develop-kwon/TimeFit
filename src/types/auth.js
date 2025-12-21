/**
 * Authentication and Registration Types
 */

// 회원가입 타입 Enum
export const RegistrationType = {
  JOB_SEEKER: 'JOB_SEEKER',
  EMPLOYER: 'EMPLOYER',
};

// 구직자 회원가입 Step 1 데이터 구조
export const JobSeekerStep1Data = {
  name: '',
  email: '',
  password: '',
  contact: '',
  address: '',
};

// 구직자 회원가입 Step 2 데이터 구조
export const JobSeekerStep2Data = {
  jobCategories: [], // 선택된 직종 배열
};

// 채용자 회원가입 데이터 구조
export const EmployerRegistrationData = {
  companyName: '',
  email: '',
  password: '',
  contact: '',
  address: '',
};

// 직종 카테고리 목록 (UI 이미지에서 확인된 항목들)
export const JobCategories = [
  '서비스업',
  '제조업',
  '건설업',
  '운송업',
  '판매/유통',
  '사무/행정',
  '요식업',
  'IT/기술',
  '교육',
  '의료/보건',
  '기타',
];

// 유효성 검사 에러 타입
export const ValidationError = {
  field: '',
  message: '',
};


