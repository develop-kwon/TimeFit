import { useState, useEffect } from 'react';
import { registerEmployer } from '../../services/authService';
import './EmployerRegistrationForm.css';

/**
 * 채용자 회원가입 폼 컴포넌트
 * 단일 단계로 업체명, 이메일, 비밀번호, 연락처, 주소를 입력받습니다.
 */
export function EmployerRegistrationForm({
  onSuccess,
  onError,
  demoMode = false,
}) {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    contact: '',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 데모 모드일 때 기본값 설정
  useEffect(() => {
    if (demoMode && !formData.companyName) {
      setFormData({
        companyName: '(주)시흥카페',
        email: 'example@email.com',
        password: 'demo1234',
        contact: '010-1234-5678',
        address: '시흥시 정왕동',
      });
    }
  }, [demoMode]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // 에러 초기화
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = '업체명을 입력해주세요.';
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 8자 이상이어야 합니다.';
    }

    if (!formData.contact.trim()) {
      newErrors.contact = '연락처를 입력해주세요.';
    }

    if (!formData.address.trim()) {
      newErrors.address = '주소를 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await registerEmployer(formData);
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

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <div className="field-group">
        <label htmlFor="companyName" className="field-label">
          업체명
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="(주)시흥카페"
          className={`field-input ${errors.companyName ? 'field-input--error' : ''}`}
        />
        {errors.companyName && (
          <span className="field-error">{errors.companyName}</span>
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
          value={formData.email}
          onChange={handleChange}
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
          value={formData.password}
          onChange={handleChange}
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
            value={formData.contact}
            onChange={handleChange}
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
            value={formData.address}
            onChange={handleChange}
            placeholder="시흥시 정왕동"
            className={`field-input ${errors.address ? 'field-input--error' : ''}`}
          />
          {errors.address && (
            <span className="field-error">{errors.address}</span>
          )}
        </div>
      </div>

      {errors.submit && (
        <div className="error-message">{errors.submit}</div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-submit"
      >
        {isSubmitting ? '처리 중...' : '회원가입 완료'}
      </button>
    </form>
  );
}
