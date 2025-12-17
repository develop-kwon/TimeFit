import { createContext, useContext, useState, useEffect } from 'react';
import {
  login as authLogin,
  logout as authLogout,
  getStoredUser,
  isAuthenticated,
} from '../services/authService';

const AuthContext = createContext(null);

/**
 * AuthContext Provider
 * 인증 상태를 전역으로 관리하는 Context Provider
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 초기 로드 시 저장된 사용자 정보 확인
  useEffect(() => {
    if (isAuthenticated()) {
      const storedUser = getStoredUser();
      if (storedUser) {
        setUser(storedUser);
      }
    }
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

/**
 * AuthContext를 사용하는 Hook
 * @returns {Object} AuthContext 값
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
