import { useState } from 'react';
import './ScheduleForm.css';

/**
 * ScheduleForm Component
 * 일정 생성/수정 폼
 * @param {Object} props
 * @param {Object|null} props.schedule - 수정할 일정 (없으면 생성)
 * @param {Function} props.onSubmit - 제출 콜백 (schedule) => void
 * @param {Function} props.onCancel - 취소 콜백
 */
const ScheduleForm = ({ schedule = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    date: schedule?.date || '',
    startTime: schedule?.startTime || '',
    endTime: schedule?.endTime || '',
    isAvailable: schedule?.isAvailable ?? true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 유효성 검사
    if (!formData.date || !formData.startTime || !formData.endTime) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    if (formData.startTime >= formData.endTime) {
      alert('시작 시간은 종료 시간보다 빨라야 합니다.');
      return;
    }

    onSubmit({
      ...formData,
      id: schedule?.id,
    });
  };

  return (
    <form className="ScheduleForm" onSubmit={handleSubmit}>
      <div className="ScheduleForm__field">
        <label className="ScheduleForm__label">
          날짜 <span className="ScheduleForm__required">*</span>
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="ScheduleForm__input"
          required
        />
      </div>

      <div className="ScheduleForm__field">
        <label className="ScheduleForm__label">
          시작 시간 <span className="ScheduleForm__required">*</span>
        </label>
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          className="ScheduleForm__input"
          required
        />
      </div>

      <div className="ScheduleForm__field">
        <label className="ScheduleForm__label">
          종료 시간 <span className="ScheduleForm__required">*</span>
        </label>
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          className="ScheduleForm__input"
          required
        />
      </div>

      <div className="ScheduleForm__field">
        <label className="ScheduleForm__checkbox-label">
          <input
            type="checkbox"
            name="isAvailable"
            checked={formData.isAvailable}
            onChange={handleChange}
            className="ScheduleForm__checkbox"
          />
          <span>근무 가능</span>
        </label>
      </div>

      <div className="ScheduleForm__actions">
        <button
          type="button"
          onClick={onCancel}
          className="ScheduleForm__button ScheduleForm__button--cancel"
        >
          취소
        </button>
        <button
          type="submit"
          className="ScheduleForm__button ScheduleForm__button--submit"
        >
          {schedule ? '수정' : '등록'}
        </button>
      </div>
    </form>
  );
};

export default ScheduleForm;

