import { useState, useEffect } from 'react';
import { getEmployerJobPostings, getApplicants } from '../../services/employerService';
import { useErrorHandler } from '../../components/ErrorDisplay';
import EmployerApplicantDetailView from './EmployerApplicantDetailView';
import './EmployerApplicantMgmtPage.css';

/**
 * 채용자 지원자 관리 페이지
 * 구인글 목록을 보여주고, 선택하면 지원자 상세 화면으로 이동
 */
const EmployerApplicantMgmtPage = () => {
  const { setError } = useErrorHandler();
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    loadJobPostings();
  }, []);

  const loadJobPostings = async () => {
    setLoading(true);
    try {
      // 모든 상태의 구인글 가져오기
      const allJobs = await getEmployerJobPostings(null, true);
      setJobPostings(allJobs || []);
    } catch (error) {
      console.error('구인글 로드 오류:', error);
      setError(error);
      setJobPostings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleJobSelect = (jobId) => {
    setSelectedJobId(jobId);
  };

  const handleBack = () => {
    setSelectedJobId(null);
  };

  if (selectedJobId) {
    const selectedJob = jobPostings.find((job) => job.id === selectedJobId);
    return (
      <EmployerApplicantDetailView
        job={selectedJob}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="employer-applicant-management">
      <div className="employer-applicant-management__header">
        <h2 className="employer-applicant-management__title">지원자 관리</h2>
        <p className="employer-applicant-management__subtitle">
          구인글을 선택하여 지원자를 확인하세요
        </p>
      </div>

      <div className="employer-applicant-management__content">
        {loading ? (
          <div className="employer-applicant-management__loading">
            구인글을 불러오는 중...
          </div>
        ) : jobPostings.length === 0 ? (
          <div className="employer-applicant-management__empty">
            <p>등록된 구인글이 없습니다.</p>
          </div>
        ) : (
          <div className="employer-applicant-management__list">
            {jobPostings.map((job) => (
              <div
                key={job.id}
                className="employer-applicant-management__job-item"
                onClick={() => handleJobSelect(job.id)}
              >
                <div className="employer-applicant-management__job-info">
                  <h3 className="employer-applicant-management__job-title">
                    {job.title}
                  </h3>
                  <p className="employer-applicant-management__job-meta">
                    {job.location} • {job.industry} • {job.employmentType}
                  </p>
                </div>
                <div className="employer-applicant-management__job-badge">
                  지원자 {job.applicantCount || 0}명
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerApplicantMgmtPage;

