import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom'; // 리다이렉트를 위해 추가
import EmployerMyPage from './employer/EmployerMyPage';
import SeekerMyPage from './SeekerMyPage';
import {RegistrationType} from '../types/auth';

/**
 * 마이페이지
 * 사용자 역할에 따라 구직자/채용자 마이페이지 분기
 */
const MyPage = () => {
  // AuthContext에서 loading 상태도 함께 가져옵니다.
  const { user, loading } = useAuth();

  // 1. 로딩 중일 때 깜빡임 방지 (스피너 등을 넣어도 좋습니다)
  if (loading) {
    return <div>Loading...</div>; 
  }

  // 2. 비로그인 접근 차단 (로그인 페이지로 팅겨내기)
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // 3. 채용자인 경우 채용자 마이페이지 표시
  if (user.role === RegistrationType.EMPLOYER) {
    return <EmployerMyPage />;
  }

  // 4. 나머지는 구직자 마이페이지 (이제 안전하게 구직자임이 보장됨)
  return <SeekerMyPage />;
};

export default MyPage;