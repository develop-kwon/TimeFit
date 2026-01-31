import { useState } from 'react';
import ProfileEditModal from '../seeker/ProfileEditModal';

const SeekerProfileTab = ({ user }) => {
  // 모달을 열고 닫는 상태 관리
  const [isEditing, setIsEditing] = useState(false);

  // 저장 버튼 핸들러 (실제 API 연동 시 여기서 처리)
  const handleSaveProfile = (updatedData) => {
    console.log('서버로 전송할 수정 데이터:', updatedData);
    
    // TODO: 여기서 백엔드 API (PUT /users/me 등) 호출
    
    alert('회원 정보가 수정되었습니다.');
    setIsEditing(false); // 모달 닫기
  };

  return (
    <div className="SeekerMyPage__tab-content">
      <div className="SeekerMyPage__section-header">
        <div>
            <h3 className="SeekerMyPage__section-title">내 정보</h3>
            <p className="SeekerMyPage__section-subtitle">프로필 정보를 확인하고 수정합니다</p>
        </div>
        {/* 버튼 클릭 시 isEditing을 true로 변경 -> 모달 오픈 */}
        <button 
          className="SeekerMyPage__edit-btn"
          onClick={() => setIsEditing(true)}
        >
          수정
        </button>
      </div>

      <div className="SeekerMyPage__info-list">
        <div className="SeekerMyPage__info-item">
          <div className="SeekerMyPage__info-icon">💼</div>
          <div className="SeekerMyPage__info-content">
            <span className="SeekerMyPage__info-label">회원 유형</span>
            <span className="SeekerMyPage__info-value">구직자</span>
          </div>
        </div>
        
        <div className="SeekerMyPage__info-item">
          <div className="SeekerMyPage__info-icon">👤</div>
          <div className="SeekerMyPage__info-content">
            <span className="SeekerMyPage__info-label">이름</span>
            <span className="SeekerMyPage__info-value">{user?.name || '홍길동'}</span>
          </div>
        </div>

        <div className="SeekerMyPage__info-item">
          <div className="SeekerMyPage__info-icon">✉️</div>
          <div className="SeekerMyPage__info-content">
            <span className="SeekerMyPage__info-label">이메일</span>
            <span className="SeekerMyPage__info-value">{user?.email || 'example@email.com'}</span>
          </div>
        </div>

        <div className="SeekerMyPage__info-item">
          <div className="SeekerMyPage__info-icon">📞</div>
          <div className="SeekerMyPage__info-content">
            <span className="SeekerMyPage__info-label">연락처</span>
            <span className="SeekerMyPage__info-value">{user?.phone || '010-1234-5678'}</span>
          </div>
        </div>

        <div className="SeekerMyPage__info-item">
          <div className="SeekerMyPage__info-icon">📍</div>
          <div className="SeekerMyPage__info-content">
            <span className="SeekerMyPage__info-label">주소</span>
            <span className="SeekerMyPage__info-value">{user?.address || '시흥시 정왕동'}</span>
          </div>
        </div>
      </div>

      {/* [중요 해결 포인트]
        조건부 렌더링(&&)을 사용합니다.
        isEditing이 true일 때만 ProfileEditModal이 새로 '생성'됩니다.
        따라서 모달 내부에서 useEffect를 쓸 필요 없이 useState 초기값만으로 충분합니다.
      */}
      {isEditing && (
        <ProfileEditModal 
          user={user}
          onClose={() => setIsEditing(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  );
};

export default SeekerProfileTab;