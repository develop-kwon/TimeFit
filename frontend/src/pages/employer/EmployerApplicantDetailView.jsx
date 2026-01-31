import { useState, useEffect } from 'react';
import { getApplicants, updateApplicantStatus } from '../../services/employerService';
import { useErrorHandler } from '../../components/ErrorDisplay';
import ApplicantActions from '../../components/employer/ApplicantActions';
import './EmployerApplicantDetailView.css';

/**
 * 지원자 상세 화면
 * 특정 구인글에 지원한 구직자들의 목록과 액션
 */
const EmployerApplicantDetailView = ({ job, onBack }) => {
  const { setError } = useErrorHandler();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplicants();
  }, [job.id]);

  const loadApplicants = async () => {
    setLoading(true);
    try {
      const applicantList = await getApplicants(job.id, true);
      setApplicants(applicantList || []);
    } catch (error) {
      console.error('지원자 로드 오류:', error);
      setError(error);
      setApplicants([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (applicationId, action) => {
    try {
      await updateApplicantStatus(applicationId, action, true);
      // 지원자 목록 새로고침
      await loadApplicants();
    } catch (error) {
      setError(error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusLabel = (status) => {
    const statusMap = {
      PENDING: '대기 중',
      SELECTED: '선택됨',
      REJECTED: '거절됨',
      INTERVIEW_REQUESTED: '인터뷰 요청됨',
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    const colorMap = {
      PENDING: '#64748b',
      SELECTED: '#16a34a',
      REJECTED: '#ef4444',
      INTERVIEW_REQUESTED: '#007bff',
    };
    return colorMap[status] || '#64748b';
  };

  return (
    <div className="employer-applicant-detail">
      <div className="employer-applicant-detail__header">
        <button
          className="employer-applicant-detail__back-button"
          onClick={onBack}
        >
          ← 뒤로
        </button>
        <div>
          <h2 className="employer-applicant-detail__title">{job.title}</h2>
          <p className="employer-applicant-detail__subtitle">
            지원자 {applicants.length}명
          </p>
        </div>
      </div>

      <div className="employer-applicant-detail__content">
        {loading ? (
          <div className="employer-applicant-detail__loading">
            지원자를 불러오는 중...
          </div>
        ) : applicants.length === 0 ? (
          <div className="employer-applicant-detail__empty">
            <p>아직 지원자가 없습니다.</p>
          </div>
        ) : (
          <div className="employer-applicant-detail__list">
            {applicants.map((applicant) => (
              <div
                key={applicant.id}
                className="employer-applicant-detail__item"
              >
                <div className="employer-applicant-detail__applicant-info">
                  <div className="employer-applicant-detail__applicant-header">
                    <h3 className="employer-applicant-detail__applicant-name">
                      {applicant.jobSeeker.name}
                    </h3>
                    <span
                      className="employer-applicant-detail__status-badge"
                      style={{
                        backgroundColor: `${getStatusColor(applicant.status)}20`,
                        color: getStatusColor(applicant.status),
                      }}
                    >
                      {getStatusLabel(applicant.status)}
                    </span>
                  </div>
                  <div className="employer-applicant-detail__applicant-details">
                    <p className="employer-applicant-detail__detail-item">
                      <span className="employer-applicant-detail__detail-label">
                        이메일:
                      </span>
                      {applicant.jobSeeker.email}
                    </p>
                    <p className="employer-applicant-detail__detail-item">
                      <span className="employer-applicant-detail__detail-label">
                        연락처:
                      </span>
                      {applicant.jobSeeker.contact}
                    </p>
                    <p className="employer-applicant-detail__detail-item">
                      <span className="employer-applicant-detail__detail-label">
                        지원일:
                      </span>
                      {formatDate(applicant.appliedDate)}
                    </p>
                  </div>
                </div>
                <ApplicantActions
                  applicant={applicant}
                  onAction={handleAction}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerApplicantDetailView;

