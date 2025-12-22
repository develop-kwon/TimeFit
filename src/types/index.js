// User Role Enum
export const UserRole = {
  JOB_SEEKER: 'JOB_SEEKER',
  EMPLOYER: 'EMPLOYER',
};

// Application Status Enum
export const ApplicationStatus = {
  SUBMITTED: 'Submitted',
  SCREENING: 'Screening',
  FIRST_INTERVIEW: 'First Interview',
  SECOND_INTERVIEW: 'Second Interview',
  FINAL_INTERVIEW: 'Final Interview',
  OFFERED: 'Offered',
  DECLINED_OFFER: 'Declined Offer',
  HIRED: 'Hired',
  WITHDREW: 'Withdrew',
};

// Base User Entity
export const User = {
  id: null,
  email: '',
  password: '',
  role: UserRole.JOB_SEEKER,
  contact: '',
  address: '',
  createdAt: null,
  updatedAt: null,
};

// Job Seeker Profile
export const JobSeekerProfile = {
  userId: null,
  name: '',
  jobCategories: [],
  schedule: [],
  applications: [],
};

// Employer Profile
export const EmployerProfile = {
  userId: null,
  companyName: '',
  jobPostings: [],
};


// Job Posting Entity
export const JobPosting = {
  id: null,
  employerId: null,
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
  activePostingsLimit: 500,
  applicants: [],
};

// Application Entity
export const Application = {
  id: null,
  jobPostingId: null,
  jobSeekerId: null,
  applicationDate: null,
  status: ApplicationStatus.SUBMITTED,
};



