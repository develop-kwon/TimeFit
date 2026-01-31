import './JobPostingCard.css';

/**
 * 구인글 카드 컴포넌트
 * 지원자 수와 함께 구인글 정보를 표시
 */
const JobPostingCard = ({ job }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR');
  };

  return (
    <div className="job-posting-card">
      <div className="job-posting-card__header">
        <h3 className="job-posting-card__title">{job.title}</h3>
        <div className="job-posting-card__badge">
          지원자 {job.applicantCount || 0}명
        </div>
      </div>

      <div className="job-posting-card__content">
        <p className="job-posting-card__description">{job.description}</p>

        <div className="job-posting-card__meta">
          <div className="job-posting-card__meta-item">
            <span className="job-posting-card__meta-label">위치</span>
            <span className="job-posting-card__meta-value">{job.location}</span>
          </div>
          <div className="job-posting-card__meta-item">
            <span className="job-posting-card__meta-label">시급</span>
            <span className="job-posting-card__meta-value">
              {job.salaryRange}
            </span>
          </div>
          <div className="job-posting-card__meta-item">
            <span className="job-posting-card__meta-label">업종</span>
            <span className="job-posting-card__meta-value">{job.industry}</span>
          </div>
          <div className="job-posting-card__meta-item">
            <span className="job-posting-card__meta-label">근무 형태</span>
            <span className="job-posting-card__meta-value">
              {job.employmentType}
            </span>
          </div>
        </div>

        <div className="job-posting-card__footer">
          <div className="job-posting-card__dates">
            <span>등록일: {formatDate(job.postedDate)}</span>
            {job.applicationDeadline && (
              <span>마감일: {formatDate(job.applicationDeadline)}</span>
            )}
          </div>
          {job.isLongTerm && (
            <span className="job-posting-card__long-term">장기 근무</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobPostingCard;

