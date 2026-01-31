import { useState, useEffect } from 'react';
import './AdvancedFilterModal.css';

/**
 * 고급 필터 모달 컴포넌트
 * @param {Object} props
 * @param {boolean} props.isOpen - 모달 열림 상태
 * @param {Function} props.onClose - 모달 닫기 콜백
 * @param {Object} props.filters - 현재 필터 값
 * @param {Function} props.onApply - 필터 적용 콜백
 */
export function AdvancedFilterModal({ isOpen, onClose, filters, onApply }) {
  const [localFilters, setLocalFilters] = useState({
    minSalary: filters?.minSalary || 10000,
    maxSalary: filters?.maxSalary || 30000,
    selectedDate: filters?.selectedDate || '',
    selectedTime: filters?.selectedTime || '',
  });

  // 외부 필터 변경 시 로컬 상태 동기화
  useEffect(() => {
    if (isOpen) {
      setLocalFilters({
        minSalary: filters?.minSalary || 10000,
        maxSalary: filters?.maxSalary || 30000,
        selectedDate: filters?.selectedDate || '',
        selectedTime: filters?.selectedTime || '',
      });
    }
  }, [isOpen, filters]);

  if (!isOpen) return null;

  const handleSalaryChange = (type, value) => {
    const numValue = parseInt(value);
    if (type === 'min') {
      setLocalFilters(prev => ({
        ...prev,
        minSalary: Math.min(numValue, prev.maxSalary),
      }));
    } else {
      setLocalFilters(prev => ({
        ...prev,
        maxSalary: Math.max(numValue, prev.minSalary),
      }));
    }
  };

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleReset = () => {
    setLocalFilters({
      minSalary: 10000,
      maxSalary: 30000,
      selectedDate: '',
      selectedTime: '',
    });
  };

  const timeOptions = [
    { value: '', label: '전체' },
    { value: 'morning', label: '오전 (06:00 - 12:00)' },
    { value: 'afternoon', label: '오후 (12:00 - 18:00)' },
    { value: 'evening', label: '저녁 (18:00 - 24:00)' },
    { value: 'night', label: '야간 (00:00 - 06:00)' },
  ];

  return (
    <div className="AdvancedFilterModal__overlay" onClick={onClose}>
      <div className="AdvancedFilterModal__content" onClick={e => e.stopPropagation()}>
        {/* 헤더 */}
        <div className="AdvancedFilterModal__header">
          <div>
            <h2 className="AdvancedFilterModal__title">고급 필터</h2>
            <p className="AdvancedFilterModal__subtitle">
              일자리 검색을 위한 고급 필터를 설정하세요
            </p>
          </div>
          <button className="AdvancedFilterModal__close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* 필터 내용 */}
        <div className="AdvancedFilterModal__body">
          {/* 시급 범위 */}
          <div className="AdvancedFilterModal__filter-group">
            <label className="AdvancedFilterModal__label">시급 범위</label>
            <div className="AdvancedFilterModal__salary-range">
              <div className="AdvancedFilterModal__salary-inputs">
                <div className="AdvancedFilterModal__salary-input-wrapper">
                  <input
                    type="number"
                    className="AdvancedFilterModal__salary-input"
                    value={localFilters.minSalary}
                    onChange={e => handleSalaryChange('min', e.target.value)}
                    min="0"
                    max="100000"
                  />
                  <span className="AdvancedFilterModal__salary-unit">원</span>
                </div>
                <span className="AdvancedFilterModal__salary-separator">~</span>
                <div className="AdvancedFilterModal__salary-input-wrapper">
                  <input
                    type="number"
                    className="AdvancedFilterModal__salary-input"
                    value={localFilters.maxSalary}
                    onChange={e => handleSalaryChange('max', e.target.value)}
                    min="0"
                    max="100000"
                  />
                  <span className="AdvancedFilterModal__salary-unit">원</span>
                </div>
              </div>
              <div 
                className="AdvancedFilterModal__slider-container"
                style={{
                  '--min-percent': `${(localFilters.minSalary / 50000) * 100}%`,
                  '--max-percent': `${(localFilters.maxSalary / 50000) * 100}%`,
                }}
              >
                <div className="AdvancedFilterModal__slider-track">
                  <div 
                    className="AdvancedFilterModal__slider-range"
                    style={{
                      left: `${(localFilters.minSalary / 50000) * 100}%`,
                      width: `${((localFilters.maxSalary - localFilters.minSalary) / 50000) * 100}%`,
                    }}
                  />
                </div>
                <input
                  type="range"
                  className="AdvancedFilterModal__slider AdvancedFilterModal__slider--min"
                  min="0"
                  max="50000"
                  step="1000"
                  value={localFilters.minSalary}
                  onChange={e => handleSalaryChange('min', e.target.value)}
                />
                <input
                  type="range"
                  className="AdvancedFilterModal__slider AdvancedFilterModal__slider--max"
                  min="0"
                  max="50000"
                  step="1000"
                  value={localFilters.maxSalary}
                  onChange={e => handleSalaryChange('max', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* 날짜 */}
          <div className="AdvancedFilterModal__filter-group">
            <label className="AdvancedFilterModal__label">날짜</label>
            <input
              type="date"
              className="AdvancedFilterModal__date-input"
              value={localFilters.selectedDate}
              onChange={e =>
                setLocalFilters(prev => ({ ...prev, selectedDate: e.target.value }))
              }
            />
          </div>

          {/* 시간 */}
          <div className="AdvancedFilterModal__filter-group">
            <label className="AdvancedFilterModal__label">시간</label>
            <select
              className="AdvancedFilterModal__select"
              value={localFilters.selectedTime}
              onChange={e =>
                setLocalFilters(prev => ({ ...prev, selectedTime: e.target.value }))
              }
            >
              {timeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 푸터 */}
        <div className="AdvancedFilterModal__footer">
          <button className="AdvancedFilterModal__button AdvancedFilterModal__button--cancel" onClick={onClose}>
            취소
          </button>
          <button className="AdvancedFilterModal__button AdvancedFilterModal__button--reset" onClick={handleReset}>
            초기화
          </button>
          <button className="AdvancedFilterModal__button AdvancedFilterModal__button--apply" onClick={handleApply}>
            적용
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdvancedFilterModal;

