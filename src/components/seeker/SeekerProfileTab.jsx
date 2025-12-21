const SeekerProfileTab = ({ user }) => {
  return (
    <div className="SeekerMyPage__tab-content">
      <div className="SeekerMyPage__section-header">
        <div>
            <h3 className="SeekerMyPage__section-title">내 정보</h3>
            <p className="SeekerMyPage__section-subtitle">프로필 정보를 확인하고 수정합니다</p>
        </div>
        <button className="SeekerMyPage__edit-btn">수정</button>
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
    </div>
  );
};

export default SeekerProfileTab;

