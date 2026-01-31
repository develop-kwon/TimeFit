import { useState } from 'react';
import { applyToJob } from '../../services/jobService';
import { useAuth } from '../../context/AuthContext';
import { ApplyConfirmModal } from './ApplyConfirmModal';
import './JobCard.css';

/**
 * JobCard 컴포넌트
 * 일자리 카드 표시 및 지원 기능
 * @param {Object} props
 * @param {Object} props.job - 일자리 정보
 * @param {Function} props.onApplySuccess - 지원 성공 콜백
 * @param {Function} props.onApplyError - 지원 실패 콜백
 * @param {Object} props.scheduleMatch - 일정 매칭 결과 (optional)
 */
export function JobCard({ job, onApplySuccess, onApplyError, scheduleMatch }) {
  const { isAuthenticated, user } = useAuth();
  const [isApplying, setIsApplying] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleApplyClick = () => {
    // 모달 열기 (인증 체크는 모달 내부에서 처리)
    setShowConfirmModal(true);
  };

  const handleConfirmApply = async () => {
    // 인증 체크
    if (!isAuthenticated) {
      if (onApplyError) {
        onApplyError(new Error('로그인이 필요합니다.'));
      }
      return;
    }

    if (user?.role !== 'JOB_SEEKER') {
      if (onApplyError) {
        onApplyError(new Error('구직자만 지원할 수 있습니다.'));
      }
      return;
    }

    setIsApplying(true);

    try {
      await applyToJob(job.id);
      setIsApplied(true);
      if (onApplySuccess) {
        onApplySuccess(job);
      }
    } catch (error) {
      if (onApplyError) {
        onApplyError(error);
      }
    } finally {
      setIsApplying(false);
    }
  };

  const formatDate = dateString => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = timeString => {
    if (!timeString) return '';
    return timeString;
  };

  return (
    <div className="JobCard">
      <div className="JobCard__header">
        <div className="JobCard__company">
          <h3 className="JobCard__company-name">{job.employer?.companyName || '회사명'}</h3>
          <span className="JobCard__industry">{job.industry}</span>
        </div>
      </div>

      <div className="JobCard__body">
        <h2 className="JobCard__title">{job.title}</h2>
        <p className="JobCard__description">{job.description}</p>

        <div className="JobCard__details">
          <div className="JobCard__detail-item">
            <span className="JobCard__detail-label">📍 위치</span>
            <span className="JobCard__detail-value">{job.location}</span>
          </div>
          <div className="JobCard__detail-item">
            <span className="JobCard__detail-label">💰 급여</span>
            <span className="JobCard__detail-value">{job.salaryRange}</span>
          </div>
          <div className="JobCard__detail-item">
            <span className="JobCard__detail-label">📅 근무일</span>
            <span className="JobCard__detail-value">
              {formatDate(job.startDate)} {formatTime(job.startTime)} - {formatTime(job.endTime)}
            </span>
          </div>
          <div className="JobCard__detail-item">
            <span className="JobCard__detail-label">⏰ 마감일</span>
            <span className="JobCard__detail-value">{formatDate(job.applicationDeadline)}</span>
          </div>
        </div>

        {/* 일정 매칭 정보 표시 - 일정이 있고 매칭된 경우에만 표시 */}
        {scheduleMatch && scheduleMatch.hasSchedule && scheduleMatch.matches.length > 0 && (
          <div className="JobCard__schedule-match JobCard__schedule-match--has-schedule">
            <div>
              <span className="JobCard__schedule-match-icon">✅</span>
              <span className="JobCard__schedule-match-text">
                {scheduleMatch.matches.length}개의 일정이 매칭되었습니다.
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="JobCard__footer">
        <div className="JobCard__meta">
          <span className="JobCard__applicant-count">
            지원자 {job.applicantCount || 0}명
          </span>
          <span className="JobCard__posted-date">
            {formatDate(job.postedDate)}
          </span>
        </div>
        <button
          className={`JobCard__apply-btn ${isApplied ? 'JobCard__apply-btn--applied' : ''}`}
          onClick={handleApplyClick}
          disabled={isApplying || isApplied}
        >
          {isApplied ? '지원 완료' : isApplying ? '지원 중...' : '지원하기'}
        </button>
      </div>

      {/* 지원 확인 모달 */}
      <ApplyConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        job={job}
        onConfirm={handleConfirmApply}
      />
    </div>
  );
}

export default JobCard;

