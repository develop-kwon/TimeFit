import { useState } from 'react';
import { createJobPosting } from '../../services/employerService';
import { JobCategories } from '../../types/auth';
import { sanitizeInput } from '../../utils/inputSanitizer';
import './JobPostingForm.css';

/**
 * 구인글 작성 폼 컴포넌트
 */
const JobPostingForm = ({ onSuccess, onError, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salaryRange: '',
    requiredSkills: [],
    applicationDeadline: '',
    startDate: '',
    startTime: '',
    endTime: '',
    isLongTerm: false,
    industry: '',
    employmentType: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSkillAdd = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault();
      const skill = e.target.value.trim();
      if (!formData.requiredSkills.includes(skill)) {
        setFormData((prev) => ({
          ...prev,
          requiredSkills: [...prev.requiredSkills, skill],
        }));
      }
      e.target.value = '';
    }
  };

  const handleSkillRemove = (skill) => {
    setFormData((prev) => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter((s) => s !== skill),
    }));
  };

  const validate = () => {
    const newErrors = {};

    const sanitizedTitle = sanitizeInput(formData.title, 200);
    if (!sanitizedTitle) {
      newErrors.title = '제목을 입력해주세요.';
    }

    const sanitizedDescription = sanitizeInput(formData.description, 2000);
    if (!sanitizedDescription) {
      newErrors.description = '설명을 입력해주세요.';
    }

    const sanitizedLocation = sanitizeInput(formData.location, 100);
    if (!sanitizedLocation) {
      newErrors.location = '위치를 입력해주세요.';
    }

    const sanitizedSalaryRange = sanitizeInput(formData.salaryRange, 50);
    if (!sanitizedSalaryRange) {
      newErrors.salaryRange = '시급을 입력해주세요.';
    }

    if (!formData.applicationDeadline) {
      newErrors.applicationDeadline = '마감일을 선택해주세요.';
    }
    if (!formData.startTime) {
      newErrors.startTime = '시작 시간을 선택해주세요.';
    }
    if (!formData.endTime) {
      newErrors.endTime = '종료 시간을 선택해주세요.';
    }
    if (!formData.industry) {
      newErrors.industry = '업종을 선택해주세요.';
    }
    if (!formData.employmentType) {
      newErrors.employmentType = '근무 형태를 선택해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 입력 데이터 sanitize
      const sanitizedData = {
        title: sanitizeInput(formData.title, 200),
        description: sanitizeInput(formData.description, 2000),
        location: sanitizeInput(formData.location, 100),
        salaryRange: sanitizeInput(formData.salaryRange, 50),
        requiredSkills: formData.requiredSkills.map(skill => sanitizeInput(skill, 50)),
        applicationDeadline: formData.applicationDeadline,
        startTime: formData.startTime,
        endTime: formData.endTime,
        isLongTerm: formData.isLongTerm,
        industry: formData.industry,
        employmentType: formData.employmentType,
      };

      const response = await createJobPosting(sanitizedData, true);
      if (onSuccess) {
        onSuccess(response);
      }
    } catch (error) {
      if (onError) {
        onError(error);
      } else {
        setErrors({
          submit: error.message || '구인글 작성 중 오류가 발생했습니다.',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="job-posting-form">
      <div className="job-posting-form__field">
        <label className="job-posting-form__label">
          제목 <span className="job-posting-form__required">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="예: 카페 바리스타 모집"
          className={`job-posting-form__input ${
            errors.title ? 'job-posting-form__input--error' : ''
          }`}
        />
        {errors.title && (
          <span className="job-posting-form__error">{errors.title}</span>
        )}
      </div>

      <div className="job-posting-form__field">
        <label className="job-posting-form__label">
          설명 <span className="job-posting-form__required">*</span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="구인글에 대한 상세 설명을 입력해주세요"
          rows={4}
          className={`job-posting-form__textarea ${
            errors.description ? 'job-posting-form__input--error' : ''
          }`}
        />
        {errors.description && (
          <span className="job-posting-form__error">{errors.description}</span>
        )}
      </div>

      <div className="job-posting-form__row">
        <div className="job-posting-form__field">
          <label className="job-posting-form__label">
            위치 <span className="job-posting-form__required">*</span>
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="예: 정왕동"
            className={`job-posting-form__input ${
              errors.location ? 'job-posting-form__input--error' : ''
            }`}
          />
          {errors.location && (
            <span className="job-posting-form__error">{errors.location}</span>
          )}
        </div>

        <div className="job-posting-form__field">
          <label className="job-posting-form__label">
            시급 <span className="job-posting-form__required">*</span>
          </label>
          <input
            type="text"
            name="salaryRange"
            value={formData.salaryRange}
            onChange={handleChange}
            placeholder="예: 시급 10,000원"
            className={`job-posting-form__input ${
              errors.salaryRange ? 'job-posting-form__input--error' : ''
            }`}
          />
          {errors.salaryRange && (
            <span className="job-posting-form__error">
              {errors.salaryRange}
            </span>
          )}
        </div>
      </div>

      <div className="job-posting-form__row">
        <div className="job-posting-form__field">
          <label className="job-posting-form__label">
            업종 <span className="job-posting-form__required">*</span>
          </label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className={`job-posting-form__select ${
              errors.industry ? 'job-posting-form__input--error' : ''
            }`}
          >
            <option value="">선택해주세요</option>
            {JobCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.industry && (
            <span className="job-posting-form__error">{errors.industry}</span>
          )}
        </div>

        <div className="job-posting-form__field">
          <label className="job-posting-form__label">
            근무 형태 <span className="job-posting-form__required">*</span>
          </label>
          <select
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
            className={`job-posting-form__select ${
              errors.employmentType ? 'job-posting-form__input--error' : ''
            }`}
          >
            <option value="">선택해주세요</option>
            <option value="정규직">정규직</option>
            <option value="파트타임">파트타임</option>
            <option value="계약직">계약직</option>
            <option value="인턴">인턴</option>
          </select>
          {errors.employmentType && (
            <span className="job-posting-form__error">
              {errors.employmentType}
            </span>
          )}
        </div>
      </div>

      <div className="job-posting-form__row">
        <div className="job-posting-form__field">
          <label className="job-posting-form__label">
            시작 시간 <span className="job-posting-form__required">*</span>
          </label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className={`job-posting-form__input ${
              errors.startTime ? 'job-posting-form__input--error' : ''
            }`}
          />
          {errors.startTime && (
            <span className="job-posting-form__error">{errors.startTime}</span>
          )}
        </div>

        <div className="job-posting-form__field">
          <label className="job-posting-form__label">
            종료 시간 <span className="job-posting-form__required">*</span>
          </label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className={`job-posting-form__input ${
              errors.endTime ? 'job-posting-form__input--error' : ''
            }`}
          />
          {errors.endTime && (
            <span className="job-posting-form__error">{errors.endTime}</span>
          )}
        </div>
      </div>

      <div className="job-posting-form__row">
        <div className="job-posting-form__field">
          <label className="job-posting-form__label">
            마감일 <span className="job-posting-form__required">*</span>
          </label>
          <input
            type="date"
            name="applicationDeadline"
            value={formData.applicationDeadline}
            onChange={handleChange}
            className={`job-posting-form__input ${
              errors.applicationDeadline
                ? 'job-posting-form__input--error'
                : ''
            }`}
          />
          {errors.applicationDeadline && (
            <span className="job-posting-form__error">
              {errors.applicationDeadline}
            </span>
          )}
        </div>

        <div className="job-posting-form__field">
          <label className="job-posting-form__label">필요 스킬</label>
          <input
            type="text"
            placeholder="스킬을 입력하고 Enter를 누르세요"
            onKeyDown={handleSkillAdd}
            className="job-posting-form__input"
          />
          {formData.requiredSkills.length > 0 && (
            <div className="job-posting-form__skills">
              {formData.requiredSkills.map((skill) => (
                <span key={skill} className="job-posting-form__skill-tag">
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleSkillRemove(skill)}
                    className="job-posting-form__skill-remove"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="job-posting-form__field">
        <label className="job-posting-form__checkbox-label">
          <input
            type="checkbox"
            name="isLongTerm"
            checked={formData.isLongTerm}
            onChange={handleChange}
            className="job-posting-form__checkbox"
          />
          <span>장기 근무</span>
        </label>
      </div>

      {errors.submit && (
        <div className="job-posting-form__error-message">{errors.submit}</div>
      )}

      <div className="job-posting-form__actions">
        <button
          type="button"
          onClick={onCancel}
          className="job-posting-form__button job-posting-form__button--cancel"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="job-posting-form__button job-posting-form__button--submit"
        >
          {isSubmitting ? '등록 중...' : '등록'}
        </button>
      </div>
    </form>
  );
};

export default JobPostingForm;

