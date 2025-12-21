import Header from '../components/Header';
import Button from '../components/Button';
import ButtonList from '../components/ButtonList';
import Logo from '../assets/TimeFit_Logo.png';
import { useNavigate } from 'react-router-dom';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  const nav = useNavigate();

  // -----------------------------------------------------------
  // [개발용 임시 상태]
  // true로 설정하면: 마이페이지/로그아웃 버튼이 보임 (마이페이지 작업용)
  // false로 설정하면: 로그인 버튼이 보임
  const isLoggedIn = true; 
  // -----------------------------------------------------------

  const navItems = [
    { label: '홈', onClick: () => nav('/'), type: 'Plain' },
    { label: '태스크 보드', onClick: () => nav('/tasks'), type: 'Plain' },
    { label: '일자리 찾기', onClick: () => nav('/find'), type: 'Plain' },
  ];

  // 마이페이지 이동 핸들러
  const handleMyPageClick = () => {
    nav('/mypage');
  };

  // 로그아웃 핸들러 (임시)
  const handleLogout = () => {
    alert('로그아웃 되었습니다. (UI 테스트)');
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
          // 임시 변수 isLoggedIn에 따라 버튼 분기
          isLoggedIn ? (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Button
                text="마이페이지"
                type="Plain"
                onClick={handleMyPageClick}
              />
              <Button
                text="로그아웃"
                type="Plain"
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

