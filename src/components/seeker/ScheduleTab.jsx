import { useState, useEffect, useCallback } from 'react';
import { getSchedules, createSchedule, updateSchedule, deleteSchedule } from '../../services/jobService';
import ScheduleForm from './ScheduleForm';
import './ScheduleTab.css';

/**
 * ScheduleTab Component
 * 일정 관리 탭
 */
const ScheduleTab = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);

  const loadSchedules = useCallback(async () => {
    setLoading(true);
    try {
      const scheduleList = await getSchedules(true);
      setSchedules(scheduleList || []);
    } catch (error) {
      console.error('일정을 불러올 수 없습니다:', error);
      setSchedules([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSchedules();
  }, [loadSchedules]);

  const handleCreate = () => {
    setEditingSchedule(null);
    setShowForm(true);
  };

  const handleEdit = (schedule) => {
    setEditingSchedule(schedule);
    setShowForm(true);
  };

  const handleDelete = async (scheduleId) => {
    if (!window.confirm('이 일정을 삭제하시겠습니까?')) {
      return;
    }

    try {
      await deleteSchedule(scheduleId, true);
      await loadSchedules();
    } catch (error) {
      console.error('일정 삭제 실패:', error);
      alert('일정 삭제에 실패했습니다.');
    }
  };

  const handleFormSubmit = async (scheduleData) => {
    try {
      if (editingSchedule) {
        await updateSchedule(editingSchedule.id, scheduleData, true);
      } else {
        await createSchedule(scheduleData, true);
      }
      setShowForm(false);
      setEditingSchedule(null);
      await loadSchedules();
    } catch (error) {
      console.error('일정 저장 실패:', error);
      alert('일정 저장에 실패했습니다.');
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingSchedule(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    });
  };

  if (loading) {
    return <div className="ScheduleTab__loading">일정을 불러오는 중...</div>;
  }

  return (
    <div className="ScheduleTab">
      <div className="ScheduleTab__header">
        <h3 className="ScheduleTab__title">일정 관리</h3>
        <button
          className="ScheduleTab__add-button"
          onClick={handleCreate}
        >
          + 일정 추가
        </button>
      </div>

      {showForm && (
        <div className="ScheduleTab__form-container">
          <ScheduleForm
            schedule={editingSchedule}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </div>
      )}

      {!showForm && (
        <div className="ScheduleTab__list">
          {schedules.length === 0 ? (
            <div className="ScheduleTab__empty">
              등록된 일정이 없습니다. 일정을 추가해주세요.
            </div>
          ) : (
            schedules.map((schedule) => (
              <div key={schedule.id} className="ScheduleTab__item">
                <div className="ScheduleTab__item-content">
                  <div className="ScheduleTab__item-date">
                    {formatDate(schedule.date)}
                  </div>
                  <div className="ScheduleTab__item-time">
                    {schedule.startTime} ~ {schedule.endTime}
                  </div>
                  <div className="ScheduleTab__item-status">
                    {schedule.isAvailable ? (
                      <span className="ScheduleTab__status-badge ScheduleTab__status-badge--available">
                        근무 가능
                      </span>
                    ) : (
                      <span className="ScheduleTab__status-badge ScheduleTab__status-badge--unavailable">
                        근무 불가
                      </span>
                    )}
                  </div>
                </div>
                <div className="ScheduleTab__item-actions">
                  <button
                    className="ScheduleTab__action-button"
                    onClick={() => handleEdit(schedule)}
                  >
                    수정
                  </button>
                  <button
                    className="ScheduleTab__action-button ScheduleTab__action-button--delete"
                    onClick={() => handleDelete(schedule.id)}
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ScheduleTab;

