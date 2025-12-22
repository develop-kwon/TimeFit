// src/components/ServiceGuide.jsx
import React from 'react';
import './ServiceGuide.css';

const ServiceGuide = () => {
  const features = [
    {
      icon: '🗓️',
      title: '스케줄 기반 매칭',
      desc: '복잡한 조율 없이, 등록된 스케줄을 분석하여 시간이 딱 맞는 일자리만 자동으로 추천해 드립니다.',
      bg: '#e3f2fd', // 연한 파랑
      color: '#007bff' // 찐 파랑
    },
    {
      icon: '⚡',
      title: '실시간 신청 관리',
      desc: '기다림은 이제 그만. 구직자는 즉시 신청하고, 채용자는 실시간으로 확인하여 빠르게 매칭을 확정합니다.',
      bg: '#fff3e0', // 연한 주황 (포인트)
      color: '#ff9800'
    },
    {
      icon: '🤝',
      title: '상호 신뢰 리뷰',
      desc: '투명한 양방향 리뷰 시스템으로 서로를 평가합니다. 검증된 평판으로 신뢰할 수 있는 근무 환경을 만듭니다.',
      bg: '#e8f5e9', // 연한 초록
      color: '#4caf50'
    }
  ];

  const steps = [
    {
      step: '01',
      title: '회원가입 & 프로필',
      desc: '구직자 또는 구인자로 가입 후, 나를 어필할 수 있는 프로필을 간단히 작성하세요.'
    },
    {
      step: '02',
      title: '스케줄 등록',
      desc: '근무 가능한 시간(구직자) 또는 필요한 시간(구인자)을 캘린더에 등록합니다.'
    },
    {
      step: '03',
      title: '매칭 & 근무 시작',
      desc: 'TimeFit이 최적의 상대를 찾아줍니다. 매칭 확정 후 바로 근무를 시작하세요.'
    }
  ];

  return (
    <div className="service-guide">
      {/* 섹션 1: 서비스 특장점 (카드 그리드) */}
      <section className="guide-section">
        <div className="section-header">
          <span className="section-badge">Why TimeFit?</span>
          <h2 className="section-title">왜 <span className="highlight">TimeFit</span>인가요?</h2>
          <p className="section-subtitle">시간 낭비 없는 확실한 매칭 시스템을 경험하세요</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon-wrapper" style={{ backgroundColor: feature.bg, color: feature.color }}>
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 섹션 2: 이용 방법 (프로세스 플로우) */}
      <section className="guide-section process-section">
        <div className="section-header">
          <span className="section-badge">How it works</span>
          <h2 className="section-title">이렇게 시작하세요</h2>
          <p className="section-subtitle">복잡한 절차 없이 3단계로 끝나는 매칭</p>
        </div>

        <div className="process-container">
          {/* 연결선 (배경) */}
          <div className="process-line"></div>
          
          <div className="steps-wrapper">
            {steps.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-circle">
                  <span className="step-number">{step.step}</span>
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceGuide;