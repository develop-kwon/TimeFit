import { useState, useEffect } from 'react';
import { registerEmployer } from '../../services/authService';

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
    <form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'left' }}>
      <div style={{ marginBottom: '20px' }}>
        <label
          htmlFor="companyName"
          style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333',
          }}
        >
          업체명
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="(주)시흥카페"
          style={{
            width: '100%',
            padding: '12px',
            border: `1px solid ${errors.companyName ? '#f00' : '#ddd'}`,
            borderRadius: '8px',
            fontSize: '16px',
            boxSizing: 'border-box',
            backgroundColor: '#f5f5f5',
            color: '#333',
          }}
        />
        {errors.companyName && (
          <span
            style={{
              color: '#f00',
              fontSize: '14px',
              marginTop: '4px',
              display: 'block',
            }}
          >
            {errors.companyName}
          </span>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label
          htmlFor="email"
          style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333',
          }}
        >
          이메일
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@email.com"
          style={{
            width: '100%',
            padding: '12px',
            border: `1px solid ${errors.email ? '#f00' : '#ddd'}`,
            borderRadius: '8px',
            fontSize: '16px',
            boxSizing: 'border-box',
            backgroundColor: '#f5f5f5',
            color: '#333',
          }}
        />
        {errors.email && (
          <span
            style={{
              color: '#f00',
              fontSize: '14px',
              marginTop: '4px',
              display: 'block',
            }}
          >
            {errors.email}
          </span>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label
          htmlFor="password"
          style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333',
          }}
        >
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력해주세요"
          style={{
            width: '100%',
            padding: '12px',
            border: `1px solid ${errors.password ? '#f00' : '#ddd'}`,
            borderRadius: '8px',
            fontSize: '16px',
            boxSizing: 'border-box',
            backgroundColor: '#f5f5f5',
            color: '#333',
          }}
        />
        {errors.password && (
          <span
            style={{
              color: '#f00',
              fontSize: '14px',
              marginTop: '4px',
              display: 'block',
            }}
          >
            {errors.password}
          </span>
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '20px',
        }}
      >
        <div>
          <label
            htmlFor="contact"
            style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#333',
            }}
          >
            연락처
          </label>
          <input
            type="tel"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="010-1234-5678"
            style={{
              width: '100%',
              padding: '12px',
              border: `1px solid ${errors.contact ? '#f00' : '#ddd'}`,
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box',
              backgroundColor: '#f5f5f5',
              color: '#333',
            }}
          />
          {errors.contact && (
            <span
              style={{
                color: '#f00',
                fontSize: '14px',
                marginTop: '4px',
                display: 'block',
              }}
            >
              {errors.contact}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="address"
            style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#333',
            }}
          >
            주소
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="시흥시 정왕동"
            style={{
              width: '100%',
              padding: '12px',
              border: `1px solid ${errors.address ? '#f00' : '#ddd'}`,
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box',
              backgroundColor: '#f5f5f5',
              color: '#333',
            }}
          />
          {errors.address && (
            <span
              style={{
                color: '#f00',
                fontSize: '14px',
                marginTop: '4px',
                display: 'block',
              }}
            >
              {errors.address}
            </span>
          )}
        </div>
      </div>

      {errors.submit && (
        <div
          style={{
            marginBottom: '20px',
            padding: '12px',
            backgroundColor: '#fee',
            border: '1px solid #fcc',
            borderRadius: '8px',
            color: '#c33',
          }}
        >
          {errors.submit}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: '100%',
          padding: '14px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          opacity: isSubmitting ? 0.6 : 1,
        }}
      >
        {isSubmitting ? '처리 중...' : '회원가입 완료'}
      </button>
    </form>
  );
}
