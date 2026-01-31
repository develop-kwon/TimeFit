import { useEffect } from 'react';
import { createPortal } from 'react-dom'; // 1. createPortal 가져오기
import './ApplyConfirmModal.css';

/**
 * 지원 확인 모달 컴포넌트
 * React Portal을 사용하여 부모 스타일(transform 등)의 간섭을 받지 않도록 수정됨
 */
export function ApplyConfirmModal({ isOpen, onClose, job, onConfirm }) {
  // 2. 모달이 열릴 때 뒷배경 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // 스크롤 잠금
    }
    
    // 모달이 닫힐 때(Unmount 될 때) 스크롤 잠금 해제
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !job) return null;

  const formatDateShort = dateString => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}. ${month}. ${day}.`;
  };

  const formatTime = timeString => {
    if (!timeString) return '';
    return timeString;
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  // 3. createPortal을 사용하여 document.body에 직접 렌더링
  return createPortal(
    <div className="ApplyConfirmModal__overlay" onClick={onClose}>
      <div className="ApplyConfirmModal__content" onClick={e => e.stopPropagation()}>
        {/* 헤더 */}
        <div className="ApplyConfirmModal__header">
          <h2 className="ApplyConfirmModal__title">지원 확인</h2>
          <button className="ApplyConfirmModal__close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* 본문 */}
        <div className="ApplyConfirmModal__body">
          <p className="ApplyConfirmModal__question">
            <strong>{job.title}</strong>에 지원하시겠습니까?
          </p>

          <div className="ApplyConfirmModal__details">
            <div className="ApplyConfirmModal__detail-row">
              <span className="ApplyConfirmModal__detail-label">업체</span>
              <span className="ApplyConfirmModal__detail-value">
                {job.employer?.companyName || '회사명'}
              </span>
            </div>
            <div className="ApplyConfirmModal__detail-row">
              <span className="ApplyConfirmModal__detail-label">위치</span>
              <span className="ApplyConfirmModal__detail-value">{job.location}</span>
            </div>
            <div className="ApplyConfirmModal__detail-row">
              <span className="ApplyConfirmModal__detail-label">날짜</span>
              <span className="ApplyConfirmModal__detail-value">
                {formatDateShort(job.startDate)}
              </span>
            </div>
            <div className="ApplyConfirmModal__detail-row">
              <span className="ApplyConfirmModal__detail-label">시간</span>
              <span className="ApplyConfirmModal__detail-value">
                {formatTime(job.startTime)} ~ {formatTime(job.endTime)}
              </span>
            </div>
            <div className="ApplyConfirmModal__detail-row">
              <span className="ApplyConfirmModal__detail-label">시급</span>
              <span className="ApplyConfirmModal__detail-value">{job.salaryRange}</span>
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div className="ApplyConfirmModal__footer">
          <button
            className="ApplyConfirmModal__button ApplyConfirmModal__button--cancel"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="ApplyConfirmModal__button ApplyConfirmModal__button--confirm"
            onClick={handleConfirm}
          >
            지원하기
          </button>
        </div>
      </div>
    </div>,
    document.body // 모달을 body 태그 바로 아래로 "전송"합니다.
  );
}

export default ApplyConfirmModal;