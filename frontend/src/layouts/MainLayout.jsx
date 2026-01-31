import Header from '../components/Header';
import Button from '../components/Button';
import ButtonList from '../components/ButtonList';
import Logo from '../assets/TimeFit_Logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  const nav = useNavigate();
  const location = useLocation();
  
  const { user, logout } = useAuth(); 

  const navItems = [
    { label: '홈', onClick: () => nav('/'), type: 'Plain', active: location.pathname === '/' },
    { label: '태스크 보드', onClick: () => nav('/tasks'), type: 'Plain', active: location.pathname === '/tasks' },
    { label: '일자리 찾기', onClick: () => nav('/find'), type: 'Plain', active: location.pathname === '/find' },
  ];

  const handleMyPageClick = () => {
    nav('/mypage');
  };

  const handleLogout = () => {
    logout(); 
    alert('로그아웃 되었습니다.');
    nav('/'); 
  };

  return (
    <div className="MainLayout">
      <Header
        centerChild={<ButtonList items={navItems} />}
        leftChild={
          <Button
            text="TimeFit"
            icon={<img src={Logo} width={60} height={40} alt="Logo" />}
            onClick={() => nav('/')}
            type="Logo"
          />
        }
        rightChild={
          user ? (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', marginRight: '5px', color: '#555', fontWeight: 'bold' }}>
                {user.name || user.email} 님
              </span>
              <Button
                text="마이페이지"
                type="Plain"
                onClick={handleMyPageClick}
                active={location.pathname === '/mypage'}
              />
              <Button
                text="로그아웃"
                type="Logout"
                onClick={handleLogout}
              />
            </div>
          ) : (
            <Button
              text="로그인"
              type="Login"
              onClick={() => nav('/login')}
            />
          )
        }
      />
      <main className="MainLayout__body">{children}</main>
    </div>
  );
};

export default MainLayout;