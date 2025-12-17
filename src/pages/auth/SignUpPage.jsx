import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { JobSeekerRegistrationForm } from '../../components/auth/JobSeekerRegistrationForm';
import { EmployerRegistrationForm } from '../../components/auth/EmployerRegistrationForm';
import { RegistrationType } from '../../types/auth';
import { useAuth } from '../../context/AuthContext';

/**
 * 회원가입 페이지 컴포넌트
 * 구직자/채용자 탭 선택, 데모 모드 토글, 폼 통합
 */
export function SignUpPage() {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [selectedType, setSelectedType] = useState(RegistrationType.JOB_SEEKER);
  const [demoMode, setDemoMode] = useState(false);

  const handleSuccess = async response => {
    // 회원가입 성공 시 토큰이 이미 authService에서 저장됨
    // AuthContext 업데이트를 위해 사용자 정보 설정
    if (response.token && response.user) {
      updateUser(response.user);
      // 역할에 따라 다른 페이지로 리다이렉트
      // 임시로 홈으로 이동 (나중에 대시보드 페이지 구현 시 변경)
      navigate('/');
    } else {
      // 토큰이 없으면 로그인 페이지로 이동
      navigate('/login');
    }
  };

  const handleError = error => {
    console.error('회원가입 오류:', error);
    // 에러는 각 폼 컴포넌트에서 처리됨
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#fff',
        padding: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          padding: '48px',
          maxWidth: '900px',
          width: '100%',
        }}
      >
        {/* 헤더 */}
        <div style={{ marginBottom: '32px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#ff4444',
              border: '3px solid #ff4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
            }}
          >
            {selectedType === RegistrationType.JOB_SEEKER ? (
              <span style={{ fontSize: '32px' }}>👤</span>
            ) : (
              <span style={{ fontSize: '32px' }}>🏢</span>
            )}
          </div>
          <h1
            style={{
              margin: '0 0 8px 0',
              fontSize: '28px',
              fontWeight: '700',
              color: '#333',
            }}
          >
            회원가입
          </h1>
          <p style={{ margin: 0, color: '#666', fontSize: '16px' }}>
            기본 정보를 입력해주세요
          </p>
        </div>

        {/* 회원 유형 선택 */}
        <div style={{ marginBottom: '32px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '12px',
              fontWeight: '600',
              color: '#333',
              fontSize: '16px',
            }}
          >
            회원 유형
          </label>
          <div style={{ display: 'flex', gap: '12px' }}>
            {/* 구직자 옵션 */}
            <div
              onClick={() => setSelectedType(RegistrationType.JOB_SEEKER)}
              style={{
                flex: 1,
                padding: '20px',
                border: `2px solid ${
                  selectedType === RegistrationType.JOB_SEEKER
                    ? '#007bff'
                    : '#ddd'
                }`,
                borderRadius: '12px',
                cursor: 'pointer',
                backgroundColor:
                  selectedType === RegistrationType.JOB_SEEKER
                    ? '#f0f8ff'
                    : '#fff',
                transition: 'all 0.2s',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor:
                    selectedType === RegistrationType.JOB_SEEKER
                      ? '#007bff'
                      : '#ddd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                }}
              >
                <span style={{ fontSize: '24px' }}>👤</span>
              </div>
              <div
                style={{
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '4px',
                }}
              >
                구직자
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                일자리를 찾는 분
              </div>
              {selectedType === RegistrationType.JOB_SEEKER && (
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: '#007bff',
                    margin: '8px auto 0',
                  }}
                ></div>
              )}
            </div>

            {/* 채용자 옵션 */}
            <div
              onClick={() => setSelectedType(RegistrationType.EMPLOYER)}
              style={{
                flex: 1,
                padding: '20px',
                border: `2px solid ${
                  selectedType === RegistrationType.EMPLOYER
                    ? '#007bff'
                    : '#ddd'
                }`,
                borderRadius: '12px',
                cursor: 'pointer',
                backgroundColor:
                  selectedType === RegistrationType.EMPLOYER
                    ? '#f0f8ff'
                    : '#fff',
                transition: 'all 0.2s',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor:
                    selectedType === RegistrationType.EMPLOYER
                      ? '#007bff'
                      : '#ddd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                }}
              >
                <span style={{ fontSize: '24px' }}>🏢</span>
              </div>
              <div
                style={{
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '4px',
                }}
              >
                채용자
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                인력을 구하는 사업자
              </div>
              {selectedType === RegistrationType.EMPLOYER && (
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: '#007bff',
                    margin: '8px auto 0',
                  }}
                ></div>
              )}
            </div>
          </div>
        </div>

        {/* 폼 영역 */}
        <div style={{ marginBottom: '24px' }}>
          {selectedType === RegistrationType.JOB_SEEKER ? (
            <JobSeekerRegistrationForm
              onSuccess={handleSuccess}
              onError={handleError}
              demoMode={demoMode}
            />
          ) : (
            <EmployerRegistrationForm
              onSuccess={handleSuccess}
              onError={handleError}
              demoMode={demoMode}
            />
          )}
        </div>

        {/* 데모 모드 토글 */}
        <div
          style={{
            backgroundColor: '#fff9e6',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>💡</span>
            <div>
              <div
                style={{
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '4px',
                }}
              >
                데모 모드
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                입력 없이 바로 다음 단계로 진행할 수 있습니다
              </div>
            </div>
          </div>
          <label
            style={{
              position: 'relative',
              display: 'inline-block',
              width: '50px',
              height: '28px',
            }}
          >
            <input
              type="checkbox"
              checked={demoMode}
              onChange={e => setDemoMode(e.target.checked)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span
              style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: demoMode ? '#007bff' : '#ccc',
                borderRadius: '28px',
                transition: '0.3s',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  content: '""',
                  height: '20px',
                  width: '20px',
                  left: '4px',
                  bottom: '4px',
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                  transition: '0.3s',
                  transform: demoMode ? 'translateX(22px)' : 'translateX(0)',
                }}
              ></span>
            </span>
          </label>
        </div>

        {/* 로그인 링크 */}
        <div>
          <span style={{ color: '#666', fontSize: '14px' }}>
            이미 계정이 있으신가요?{' '}
          </span>
          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'none',
              border: 'none',
              color: '#007bff',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
