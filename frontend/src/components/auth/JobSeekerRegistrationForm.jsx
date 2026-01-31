import { useState, useEffect } from 'react';
import { registerJobSeeker } from '../../services/authService';
import { JobCategories } from '../../types/auth';
import { sanitizeInput, sanitizeEmail } from '../../utils/inputSanitizer'; 
import './JobSeekerRegistrationForm.css';

/**
 * 구직자 회원가입 폼 컴포넌트
 * Step 1: 기본 정보 입력
 * Step 2: 관심 직종 선택
 */
export function JobSeekerRegistrationForm({
  onSuccess,
  onError,
  demoMode = false,
}) {
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    address: '',
  });
  const [step2Data, setStep2Data] = useState({
    jobCategories: [],
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 데모 모드일 때 기본값 설정
  useEffect(() => {
    if (demoMode && !step1Data.name) {
      setStep1Data({
        name: '홍길동',
        email: 'example@email.com',
        password: 'demo1234',
        contact: '010-1234-5678',
        address: '시흥시 정왕동',
      });
    }
  }, [demoMode]);

  const handleStep1Change = e => {
    const { name, value } = e.target;
    setStep1Data(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateStep1 = () => {
    // ... 기존 유효성 검사 로직 유지 ...
    const newErrors = {};

    if (!step1Data.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    }

    if (!step1Data.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(step1Data.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.';
    }

    if (!step1Data.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (step1Data.password.length < 8) {
      newErrors.password = '비밀번호는 8자 이상이어야 합니다.';
    }

    if (!step1Data.contact.trim()) {
      newErrors.contact = '연락처를 입력해주세요.';
    }

    if (!step1Data.address.trim()) {
      newErrors.address = '주소를 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1Submit = e => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
      setErrors({});
    }
  };

  const handleCategoryToggle = category => {
    setStep2Data(prev => {
      const categories = prev.jobCategories.includes(category)
        ? prev.jobCategories.filter(c => c !== category)
        : [...prev.jobCategories, category];
      return { ...prev, jobCategories: categories };
    });
  };

  // [수정] 최종 제출 핸들러에서 보안 처리 적용
  const handleStep2Submit = async e => {
    e.preventDefault();

    if (step2Data.jobCategories.length === 0) {
      setErrors({
        jobCategories: '최소 1개 이상의 관심 직종을 선택해주세요.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // [보안 개선] 서버 전송 직전에 데이터 정제 (Sanitization)
      // 비밀번호는 특수문자가 포함될 수 있으므로 정제하지 않고 원본 그대로 보냅니다.
      const cleanData = {
        name: sanitizeInput(step1Data.name),
        email: sanitizeEmail(step1Data.email),
        contact: sanitizeInput(step1Data.contact),
        address: sanitizeInput(step1Data.address),
        password: step1Data.password, // 원본 유지
        jobCategories: step2Data.jobCategories,
      };

      // 정제된 데이터(cleanData)로 회원가입 요청
      const response = await registerJobSeeker(cleanData);
      
      if (onSuccess) {
        onSuccess(response);
      }
    } catch (error) {
      if (onError) {
        onError(error);
      } else {
        setErrors({
          submit: error.message || '회원가입 중 오류가 발생했습니다.',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
    setErrors({});
  };

  // Step 1: 기본 정보 입력
  if (step === 1) {
    return (
      <form onSubmit={handleStep1Submit} className="registration-form">
        {/* ... JSX 내용은 기존과 동일하므로 그대로 유지 ... */}
        {/* 진행 표시 */}
        <div className="progress-indicator">
          <div className="progress-step progress-step--active">1</div>
          <div className="progress-line progress-line--inactive"></div>
          <div className="progress-step progress-step--inactive">2</div>
        </div>

        <div className="field-group">
          <label htmlFor="name" className="field-label">
            이름
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={step1Data.name}
            onChange={handleStep1Change}
            placeholder="홍길동"
            className={`field-input ${errors.name ? 'field-input--error' : ''}`}
          />
          {errors.name && (
            <span className="field-error">{errors.name}</span>
          )}
        </div>

        <div className="field-group">
          <label htmlFor="email" className="field-label">
            이메일
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={step1Data.email}
            onChange={handleStep1Change}
            placeholder="example@email.com"
            className={`field-input ${errors.email ? 'field-input--error' : ''}`}
          />
          {errors.email && (
            <span className="field-error">{errors.email}</span>
          )}
        </div>

        <div className="field-group">
          <label htmlFor="password" className="field-label">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={step1Data.password}
            onChange={handleStep1Change}
            placeholder="비밀번호를 입력해주세요"
            className={`field-input ${errors.password ? 'field-input--error' : ''}`}
          />
          {errors.password && (
            <span className="field-error">{errors.password}</span>
          )}
        </div>

        <div className="field-grid">
          <div className="field-group">
            <label htmlFor="contact" className="field-label">
              연락처
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={step1Data.contact}
              onChange={handleStep1Change}
              placeholder="010-1234-5678"
              className={`field-input ${errors.contact ? 'field-input--error' : ''}`}
            />
            {errors.contact && (
              <span className="field-error">{errors.contact}</span>
            )}
          </div>

          <div className="field-group">
            <label htmlFor="address" className="field-label">
              주소
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={step1Data.address}
              onChange={handleStep1Change}
              placeholder="시흥시 정왕동"
              className={`field-input ${errors.address ? 'field-input--error' : ''}`}
            />
            {errors.address && (
              <span className="field-error">{errors.address}</span>
            )}
          </div>
        </div>

        <button type="submit" className="btn-primary">
          다음 단계
        </button>
      </form>
    );
  }

  // Step 2: 관심 직종 선택
  return (
    <form onSubmit={handleStep2Submit} className="registration-form">
      {/* ... JSX 내용은 기존과 동일하므로 그대로 유지 ... */}
      <div className="progress-indicator">
        <div className="progress-step progress-step--inactive">1</div>
        <div className="progress-line progress-line--active"></div>
        <div className="progress-step progress-step--active">2</div>
      </div>

      <div className="job-categories-section">
        <div className="job-categories-header">
          <span className="job-categories-icon">❤️</span>
          <h3 className="job-categories-title">
            관심 직종 선택 (복수 선택 가능)
          </h3>
        </div>
        <p className="job-categories-description">
          선택한 직종의 새로운 일자리가 올라오면 알림을 받을 수 있습니다.
        </p>

        <div className="job-categories-grid">
          {JobCategories.map(category => {
            const isSelected = step2Data.jobCategories.includes(category);
            return (
              <label
                key={category}
                className={`job-category-card ${
                  isSelected ? 'job-category-card--selected' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleCategoryToggle(category)}
                  className="job-category-checkbox"
                />
                <span className="job-category-label">{category}</span>
              </label>
            );
          })}
        </div>

        {errors.jobCategories && (
          <span className="field-error">{errors.jobCategories}</span>
        )}
      </div>

      {errors.submit && (
        <div className="error-message">{errors.submit}</div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary btn-secondary--spaced"
      >
        {isSubmitting ? '처리 중...' : '회원가입 완료'}
      </button>

      <button type="button" onClick={handlePrevStep} className="btn-secondary">
        이전 단계로
      </button>
    </form>
  );
}