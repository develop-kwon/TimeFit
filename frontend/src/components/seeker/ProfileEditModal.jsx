import { useState } from 'react';
import './ProfileEditModal.css';

// 부모 컴포넌트가 isEditing이 true일 때만 이 컴포넌트를 그리기 때문에,
// 컴포넌트가 실행되는 시점(Mount)에는 항상 모달이 열려있는 상태입니다.
const ProfileEditModal = ({ user, onClose, onSave }) => {
  
  // 초기값으로 바로 user 정보를 사용합니다. (useEffect 불필요)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  // 배경(Overlay)을 클릭했을 때 모달을 닫고 싶다면 onClick={onClose}를 추가
  // 내용(Content) 클릭 시에는 이벤트 전파를 막아야 함 (e.stopPropagation)
  return (
    <div className="ProfileEditModal__overlay" onClick={onClose}>
      <div className="ProfileEditModal__content" onClick={(e) => e.stopPropagation()}>
        <div className="ProfileEditModal__header">
          <h3>정보 수정</h3>
          <button className="ProfileEditModal__close-btn" onClick={onClose}>✕</button>
        </div>
        
        <form onSubmit={handleSubmit} className="ProfileEditModal__form">
          <div className="ProfileEditModal__field">
            <label>이름</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="ProfileEditModal__field">
            <label>이메일</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              disabled 
              className="disabled" // CSS에서 회색 처리됨
            />
          </div>

          <div className="ProfileEditModal__field">
            <label>연락처</label>
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              placeholder="010-0000-0000"
            />
          </div>

          <div className="ProfileEditModal__field">
            <label>주소</label>
            <input 
              type="text" 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
            />
          </div>

          <div className="ProfileEditModal__footer">
            <button type="button" className="btn-cancel" onClick={onClose}>취소</button>
            <button type="submit" className="btn-save">저장하기</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;