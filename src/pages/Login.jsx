import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { JobSeekerRegistrationForm } from '../components/auth/JobSeekerRegistrationForm';
import { EmployerRegistrationForm } from '../components/auth/EmployerRegistrationForm';
import { RegistrationType } from '../types/auth';
import MainLayout from '../layouts/MainLayout';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, updateUser } = useAuth();
  const [showSignup, setShowSignup] = useState(false);
  const [selectedType, setSelectedType] = useState(RegistrationType.JOB_SEEKER);
  const [demoMode, setDemoMode] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
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

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
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
      const response = await login(formData.email, formData.password);
      if (response.user) {
        updateUser(response.user);
      }
      navigate('/');
    } catch (error) {
      setErrors({
        submit: error.message || '로그인 중 오류가 발생했습니다.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignupSuccess = async response => {
    // 회원가입 성공 시 토큰이 이미 authService에서 저장됨
    if (response.token && response.user) {
      updateUser(response.user);
      navigate('/');
    }
  };

  const handleSignupError = error => {
    console.error('회원가입 오류:', error);
  };

  return (
    <div className="login-container">
      <div
        className={`login-card ${showSignup ? 'login-card--signup' : 'login-card--login'
          }`}
      >
        {!showSignup ? (
          <>
            {/* 로그인 폼 */}
            <div className="login-header">
              <h1 className="login-title">로그인</h1>
              <p className="login-subtitle">계정에 로그인하세요</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
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
                  className={`field-input ${errors.email ? 'field-input--error' : ''
                    }`}
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
                  className={`field-input ${errors.password ? 'field-input--error' : ''
                    }`}
                />
                {errors.password && (
                  <span className="field-error">{errors.password}</span>
                )}
              </div>

              {errors.submit && (
                <div className="error-message">{errors.submit}</div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-login"
              >
                {isSubmitting ? '로그인 중...' : '로그인'}
              </button>

              <button
                type="button"
                onClick={() => setShowSignup(true)}
                className="btn-signup"
              >
                회원가입
              </button>
            </form>
          </>
        ) : (
          <>
            {/* 회원가입 폼 */}
            <div className="signup-header">
              <div className="signup-header-content">
                <div className="signup-icon-container">
                  {selectedType === RegistrationType.JOB_SEEKER ? (
                    <span className="signup-icon">👤</span>
                  ) : (
                    <span className="signup-icon">🏢</span>
                  )}
                </div>
                <h1 className="login-title">회원가입</h1>
                <p className="login-subtitle">기본 정보를 입력해주세요</p>
              </div>

              {/* 회원 유형 선택 */}
              <div className="registration-type-section">
                <label className="registration-type-label">회원 유형</label>
                <div className="registration-type-grid">
                  {/* 구직자 옵션 */}
                  <div
                    onClick={() => setSelectedType(RegistrationType.JOB_SEEKER)}
                    className={`registration-type-card ${selectedType === RegistrationType.JOB_SEEKER
                      ? 'registration-type-card--selected'
                      : ''
                      }`}
                  >
                    <div
                      className={`registration-type-icon-container ${selectedType === RegistrationType.JOB_SEEKER
                        ? 'registration-type-icon-container--selected'
                        : ''
                        }`}
                    >
                      <span className="registration-type-icon">👤</span>
                    </div>
                    <div className="registration-type-title">구직자</div>
                    <div className="registration-type-description">
                      일자리를 찾는 분
                    </div>
                    {selectedType === RegistrationType.JOB_SEEKER && (
                      <div className="registration-type-indicator"></div>
                    )}
                  </div>

                  {/* 채용자 옵션 */}
                  <div
                    onClick={() => setSelectedType(RegistrationType.EMPLOYER)}
                    className={`registration-type-card ${selectedType === RegistrationType.EMPLOYER
                      ? 'registration-type-card--selected'
                      : ''
                      }`}
                  >
                    <div
                      className={`registration-type-icon-container ${selectedType === RegistrationType.EMPLOYER
                        ? 'registration-type-icon-container--selected'
                        : ''
                        }`}
                    >
                      <span className="registration-type-icon">🏢</span>
                    </div>
                    <div className="registration-type-title">채용자</div>
                    <div className="registration-type-description">
                      인력을 구하는 사업자
                    </div>
                    {selectedType === RegistrationType.EMPLOYER && (
                      <div className="registration-type-indicator"></div>
                    )}
                  </div>
                </div>
              </div>

              {/* 폼 영역 */}
              <div className="form-container">
                {selectedType === RegistrationType.JOB_SEEKER ? (
                  <JobSeekerRegistrationForm
                    onSuccess={handleSignupSuccess}
                    onError={handleSignupError}
                    demoMode={demoMode}
                  />
                ) : (
                  <EmployerRegistrationForm
                    onSuccess={handleSignupSuccess}
                    onError={handleSignupError}
                    demoMode={demoMode}
                  />
                )}
              </div>

              {/* 데모 모드 토글 */}
              <div className="demo-mode-section">
                <div className="demo-mode-content">
                  <span className="demo-mode-icon">💡</span>
                  <div>
                    <div className="demo-mode-title">데모 모드</div>
                    <div className="demo-mode-description">
                      입력 없이 바로 다음 단계로 진행할 수 있습니다
                    </div>
                  </div>
                </div>
                <label className="demo-mode-toggle">
                  <input
                    type="checkbox"
                    checked={demoMode}
                    onChange={e => setDemoMode(e.target.checked)}
                  />
                  <span
                    className={`demo-mode-slider ${demoMode ? 'demo-mode-slider--active' : ''
                      }`}
                  ></span>
                </label>
              </div>

              {/* 로그인 링크 */}
              <div className="login-link-section">
                <span className="login-link-text">
                  이미 계정이 있으신가요?{' '}
                </span>
                <button
                  onClick={() => setShowSignup(false)}
                  className="btn-link"
                >
                  로그인
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;