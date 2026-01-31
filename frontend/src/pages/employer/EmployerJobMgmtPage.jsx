import { useState, useEffect } from 'react';
import { getEmployerJobPostings, createJobPosting } from '../../services/employerService';
import { useErrorHandler } from '../../components/ErrorDisplay';
import JobPostingCard from '../../components/employer/JobPostingCard';
import JobPostingForm from '../../components/employer/JobPostingForm';
import './EmployerJobMgmtPage.css';

/**
 * 채용자 구인글 관리 페이지
 * 탭: 모집 중, 매칭 완료
 */
const EmployerJobMgmtPage = () => {
  const { setError } = useErrorHandler();
  const [activeStatus, setActiveStatus] = useState('HIRING'); // 'HIRING' | 'MATCHED'
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // 구인글 목록 로드
  useEffect(() => {
    loadJobPostings();
  }, [activeStatus]);

  const loadJobPostings = async () => {
    setLoading(true);
    try {
      const jobs = await getEmployerJobPostings(activeStatus, true);
      setJobPostings(jobs || []);
    } catch (error) {
      console.error('구인글 로드 오류:', error);
      setError(error);
      setJobPostings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSuccess = (newJob) => {
    setShowCreateForm(false);
    // 새 구인글이 모집 중이면 목록에 추가
    if (activeStatus === 'HIRING') {
      setJobPostings(prev => [newJob, ...prev]);
    }
  };

  const handleCreateError = (error) => {
    setError(error);
  };

  return (
    <div className="employer-job-management">
      <div className="employer-job-management__header">
        <div className="employer-job-management__status-tabs">
          <button
            className={`employer-job-management__status-tab ${
              activeStatus === 'HIRING'
                ? 'employer-job-management__status-tab--active'
                : ''
            }`}
            onClick={() => setActiveStatus('HIRING')}
          >
            모집 중
          </button>
          <button
            className={`employer-job-management__status-tab ${
              activeStatus === 'MATCHED'
                ? 'employer-job-management__status-tab--active'
                : ''
            }`}
            onClick={() => setActiveStatus('MATCHED')}
          >
            매칭 완료
          </button>
        </div>
        <button
          className="employer-job-management__create-button"
          onClick={() => setShowCreateForm(true)}
        >
          + 구인글 작성
        </button>
      </div>

      {showCreateForm && (
        <div className="employer-job-management__form-overlay">
          <div className="employer-job-management__form-container">
            <div className="employer-job-management__form-header">
              <h2>구인글 작성</h2>
              <button
                className="employer-job-management__close-button"
                onClick={() => setShowCreateForm(false)}
              >
                ✕
              </button>
            </div>
            <JobPostingForm
              onSuccess={handleCreateSuccess}
              onError={handleCreateError}
              onCancel={() => setShowCreateForm(false)}
            />
          </div>
        </div>
      )}

      <div className="employer-job-management__content">
        {loading ? (
          <div className="employer-job-management__loading">
            구인글을 불러오는 중...
          </div>
        ) : jobPostings.length === 0 ? (
          <div className="employer-job-management__empty">
            <p>등록된 구인글이 없습니다.</p>
            <button
              className="employer-job-management__create-button--empty"
              onClick={() => setShowCreateForm(true)}
            >
              + 구인글 작성하기
            </button>
          </div>
        ) : (
          <div className="employer-job-management__list">
            {jobPostings.map(job => (
              <JobPostingCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerJobMgmtPage;

