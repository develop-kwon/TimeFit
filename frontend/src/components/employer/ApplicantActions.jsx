import './ApplicantActions.css';

/**
 * 지원자 액션 컴포넌트
 * 선택, 거절, 인터뷰 요청 등의 액션 버튼
 */
const ApplicantActions = ({ applicant, onAction }) => {
  const handleAction = (action) => {
    if (onAction) {
      onAction(applicant.id, action);
    }
  };

  // 이미 선택되거나 거절된 경우 액션 버튼 숨김
  if (applicant.status === 'SELECTED' || applicant.status === 'REJECTED') {
    return null;
  }

  return (
    <div className="applicant-actions">
      {applicant.status === 'PENDING' && (
        <>
          <button
            className="applicant-actions__button applicant-actions__button--select"
            onClick={() => handleAction('SELECT')}
          >
            선택
          </button>
          <button
            className="applicant-actions__button applicant-actions__button--interview"
            onClick={() => handleAction('REQUEST_INTERVIEW')}
          >
            인터뷰 요청
          </button>
          <button
            className="applicant-actions__button applicant-actions__button--reject"
            onClick={() => handleAction('REJECT')}
          >
            거절
          </button>
        </>
      )}
      {applicant.status === 'INTERVIEW_REQUESTED' && (
        <>
          <button
            className="applicant-actions__button applicant-actions__button--select"
            onClick={() => handleAction('SELECT')}
          >
            선택
          </button>
          <button
            className="applicant-actions__button applicant-actions__button--reject"
            onClick={() => handleAction('REJECT')}
          >
            거절
          </button>
        </>
      )}
    </div>
  );
};

export default ApplicantActions;

