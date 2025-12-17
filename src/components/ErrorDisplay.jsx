import { useState, useEffect } from 'react';

/**
 * 전역 에러 표시 컴포넌트
 * @param {Object} props
 * @param {Error|string} props.error - 에러 객체 또는 에러 메시지
 * @param {Function} props.onClose - 에러 닫기 콜백
 * @param {number} props.autoCloseDelay - 자동 닫기 시간 (ms, 0이면 자동 닫기 안 함)
 */
export function ErrorDisplay({ error, onClose, autoCloseDelay = 5000 }) {
  const [isVisible, setIsVisible] = useState(!!error);

  useEffect(() => {
    setIsVisible(!!error);

    // 자동 닫기 설정
    if (error && autoCloseDelay > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [error, autoCloseDelay]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!isVisible) {
    return null;
  }

  const errorMessage =
    error instanceof Error
      ? error.message
      : error || '알 수 없는 오류가 발생했습니다.';

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: '#fee',
        border: '1px solid #fcc',
        borderRadius: '4px',
        padding: '16px',
        minWidth: '300px',
        maxWidth: '500px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ flex: 1 }}>
          <strong
            style={{ color: '#c33', display: 'block', marginBottom: '8px' }}
          >
            오류 발생
          </strong>
          <p style={{ margin: 0, color: '#333' }}>{errorMessage}</p>
        </div>
        <button
          onClick={handleClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#999',
            padding: '0',
            marginLeft: '16px',
          }}
          aria-label="닫기"
        >
          ×
        </button>
      </div>
    </div>
  );
}

/**
 * 에러 상태를 관리하는 Hook
 * @returns {Object} { error, setError, clearError }
 */
export function useErrorHandler() {
  const [error, setError] = useState(null);

  const clearError = () => {
    setError(null);
  };

  const handleError = err => {
    if (err instanceof Error) {
      setError(err);
    } else if (typeof err === 'string') {
      setError(new Error(err));
    } else {
      setError(new Error('알 수 없는 오류가 발생했습니다.'));
    }
  };

  return {
    error,
    setError: handleError,
    clearError,
  };
}
