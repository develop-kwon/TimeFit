import { useState, useEffect, useCallback } from 'react';
import { getMyActivity } from '../../services/jobService';
import { useNavigate } from 'react-router-dom';
import './ActivityTab.css';

/**
 * ActivityTab Component
 * 지원 내역 탭
 */
const ActivityTab = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadActivity = useCallback(async () => {
    setLoading(true);
    try {
      const activityList = await getMyActivity(true);
      setApplications(activityList || []);
    } catch (error) {
      console.error('지원 내역을 불러올 수 없습니다:', error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadActivity();
  }, [loadActivity]);

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
      'Submitted': '제출됨',
      'Screening': '서류 검토 중',
      'First Interview': '1차 면접',
      'Second Interview': '2차 면접',
      'Final Interview': '최종 면접',
      'Offered': '제안됨',
      'Declined Offer': '제안 거절',
      'Hired': '채용됨',
      'Withdrew': '지원 철회',
    };
    return statusMap[status] || status;
  };

  const getStatusClass = (status) => {
    const statusClassMap = {
      'Submitted': 'submitted',
      'Screening': 'screening',
      'First Interview': 'interview',
      'Second Interview': 'interview',
      'Final Interview': 'interview',
      'Offered': 'offered',
      'Declined Offer': 'declined',
      'Hired': 'hired',
      'Withdrew': 'withdrew',
    };
    return statusClassMap[status] || 'default';
  };

  if (loading) {
    return <div className="ActivityTab__loading">지원 내역을 불러오는 중...</div>;
  }

  return (
    <div className="ActivityTab">
      <div className="ActivityTab__header">
        <h3 className="ActivityTab__title">지원 내역</h3>
        <div className="ActivityTab__count">
          총 {applications.length}건
        </div>
      </div>

      <div className="ActivityTab__list">
        {applications.length === 0 ? (
          <div className="ActivityTab__empty">
            지원한 내역이 없습니다.
            <button
              className="ActivityTab__find-jobs-button"
              onClick={() => navigate('/find')}
            >
              일자리 찾기
            </button>
          </div>
        ) : (
          applications.map((application) => (
            <div key={application.id} className="ActivityTab__item">
              <div className="ActivityTab__item-header">
                <div className="ActivityTab__item-title">
                  {application.jobPosting?.title || '일자리 제목 없음'}
                </div>
                <span
                  className={`ActivityTab__status-badge ActivityTab__status-badge--${getStatusClass(application.status)}`}
                >
                  {getStatusLabel(application.status)}
                </span>
              </div>
              <div className="ActivityTab__item-company">
                {application.jobPosting?.employer?.companyName || '회사명 없음'}
              </div>
              <div className="ActivityTab__item-details">
                <div className="ActivityTab__item-detail">
                  <span className="ActivityTab__detail-label">위치</span>
                  <span className="ActivityTab__detail-value">
                    {application.jobPosting?.location || '-'}
                  </span>
                </div>
                <div className="ActivityTab__item-detail">
                  <span className="ActivityTab__detail-label">급여</span>
                  <span className="ActivityTab__detail-value">
                    {application.jobPosting?.salaryRange || '-'}
                  </span>
                </div>
                <div className="ActivityTab__item-detail">
                  <span className="ActivityTab__detail-label">지원일</span>
                  <span className="ActivityTab__detail-value">
                    {formatDate(application.applicationDate)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityTab;

