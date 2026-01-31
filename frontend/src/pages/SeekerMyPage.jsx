import { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import SeekerProfileTab from '../components/seeker/SeekerProfileTab';
import ScheduleTab from '../components/seeker/ScheduleTab';
import ActivityTab from '../components/seeker/ActivityTab';
import { useAuth } from '../context/AuthContext';
import './SeekerMyPage.css';

const SeekerMyPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  // 탭 구성 (ID를 영어로 명확히 지정)
  const tabs = [
    { id: 'profile', label: '내 정보' },
    { id: 'schedule', label: '스케줄' },
    { id: 'activity', label: '활동' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <SeekerProfileTab user={user} />;
      case 'schedule':
        return <ScheduleTab />;
      case 'activity':
        return <ActivityTab />;
      default:
        return <div className="SeekerMyPage__placeholder">준비 중인 기능입니다.</div>;
    }
  };

  return (
    <MainLayout>
      <div className="SeekerMyPage">
        <div className="SeekerMyPage__header">
          <div className="SeekerMyPage__header-icon">🧑‍💻</div>
          <div className="SeekerMyPage__header-text">
            <h1>구직자 마이페이지</h1>
            <p>내 정보와 구직 활동을 관리하세요</p>
          </div>
        </div>

        <div className="SeekerMyPage__container">
          <div className="SeekerMyPage__tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`SeekerMyPage__tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="SeekerMyPage__content-area">
            {renderContent()}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SeekerMyPage;

