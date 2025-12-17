import { useState, useEffect } from 'react';
import { registerJobSeeker } from '../../services/authService';
import { JobCategories } from '../../types/auth';

/**
 * 구직자 회원가입 폼 컴포넌트
 * Step 1: 기본 정보 입력 (이름, 이메일, 비밀번호, 연락처, 주소)
 * Step 2: 관심 직종 선택 (복수 선택)
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
      const registrationData = {
        ...step1Data,
        jobCategories: step2Data.jobCategories,
      };
      const response = await registerJobSeeker(registrationData);
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
      <form
        onSubmit={handleStep1Submit}
        style={{ width: '100%', textAlign: 'left' }}
      >
        {/* 진행 표시 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '24px',
            gap: '8px',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#007bff',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '600',
            }}
          >
            1
          </div>
          <div
            style={{ width: '40px', height: '2px', backgroundColor: '#ddd' }}
          ></div>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#ddd',
              color: '#999',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '600',
            }}
          >
            2
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label
            htmlFor="name"
            style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#333',
            }}
          >
            이름
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={step1Data.name}
            onChange={handleStep1Change}
            placeholder="홍길동"
            style={{
              width: '100%',
              padding: '12px',
              border: `1px solid ${errors.name ? '#f00' : '#ddd'}`,
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box',
              backgroundColor: '#f5f5f5',
              color: '#333',
            }}
          />
          {errors.name && (
            <span
              style={{
                color: '#f00',
                fontSize: '14px',
                marginTop: '4px',
                display: 'block',
              }}
            >
              {errors.name}
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
            value={step1Data.email}
            onChange={handleStep1Change}
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
            value={step1Data.password}
            onChange={handleStep1Change}
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
              value={step1Data.contact}
              onChange={handleStep1Change}
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
              value={step1Data.address}
              onChange={handleStep1Change}
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

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '14px',
            background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          다음 단계
        </button>
      </form>
    );
  }

  // Step 2: 관심 직종 선택
  return (
    <form
      onSubmit={handleStep2Submit}
      style={{ width: '100%', textAlign: 'left' }}
    >
      {/* 진행 표시 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '24px',
          gap: '8px',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#ddd',
            color: '#999',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '600',
          }}
        >
          1
        </div>
        <div
          style={{ width: '40px', height: '2px', backgroundColor: '#007bff' }}
        ></div>
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#007bff',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '600',
          }}
        >
          2
        </div>
      </div>

      {/* 관심 직종 선택 섹션 */}
      <div style={{ marginBottom: '32px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px',
          }}
        >
          <span style={{ fontSize: '20px' }}>❤️</span>
          <h3
            style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: '600',
              color: '#333',
            }}
          >
            관심 직종 선택 (복수 선택 가능)
          </h3>
        </div>
        <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>
          선택한 직종의 새로운 일자리가 올라오면 알림을 받을 수 있습니다.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
            gap: '12px',
          }}
        >
          {JobCategories.map(category => {
            const isSelected = step2Data.jobCategories.includes(category);
            return (
              <label
                key={category}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '16px',
                  border: `2px solid ${isSelected ? '#007bff' : '#ddd'}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: isSelected ? '#f0f8ff' : '#fff',
                  transition: 'all 0.2s',
                }}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleCategoryToggle(category)}
                  style={{ marginBottom: '8px' }}
                />
                <span
                  style={{
                    fontSize: '14px',
                    textAlign: 'center',
                    color: '#333',
                  }}
                >
                  {category}
                </span>
              </label>
            );
          })}
        </div>

        {errors.jobCategories && (
          <span
            style={{
              color: '#f00',
              fontSize: '14px',
              marginTop: '8px',
              display: 'block',
            }}
          >
            {errors.jobCategories}
          </span>
        )}
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
          background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          opacity: isSubmitting ? 0.6 : 1,
          marginBottom: '12px',
        }}
      >
        {isSubmitting ? '처리 중...' : '회원가입 완료'}
      </button>

      <button
        type="button"
        onClick={handlePrevStep}
        style={{
          width: '100%',
          padding: '14px',
          backgroundColor: '#fff',
          color: '#666',
          border: '1px solid #ddd',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
        }}
      >
        이전 단계로
      </button>
    </form>
  );
}
