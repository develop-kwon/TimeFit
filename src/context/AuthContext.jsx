import { createContext, useContext, useState, useEffect } from 'react';
import {
  login as authLogin,
  logout as authLogout,
  getStoredUser,
  getToken,
} from '../services/authService';
import { isTokenExpired } from '../utils/jwtUtils';

const AuthContext = createContext(null);

/**
 * AuthContext Provider
 * 인증 상태를 전역으로 관리하는 Context Provider
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    const initAuth = () => {
      const token = getToken();
      const storedUser = getStoredUser();

      if (token && storedUser) {
        // 토큰이 유효한지(시간이 안 지났는지) 확인
        if (isTokenExpired(token)) {
          console.log('토큰이 만료되어 자동 로그아웃됩니다.');
          authLogout(); // 스토리지 비우기
          setUser(null);
        } else {
          setUser(storedUser); // 유효하면 로그인 유지
        }
      }
    };

    initAuth();
    setLoading(false);
  }, []);

  /**
   * 로그인 함수
   * @param {string} email - 이메일
   * @param {string} password - 비밀번호
   * @returns {Promise<void>}
   */
  const login = async (email, password) => {
    try {
      const response = await authLogin(email, password);
      setUser(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  /**
   * 로그아웃 함수
   */
  const logout = () => {
    authLogout();
    setUser(null);
  };

  /**
   * 사용자 정보 업데이트
   * @param {Object} userData - 업데이트할 사용자 정보
   */
  const updateUser = userData => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
    loading,
  };

return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}



