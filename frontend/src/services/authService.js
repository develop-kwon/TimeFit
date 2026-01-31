/**
 * Authentication Service
 * JWT 기반 인증 관련 API 호출 및 토큰 관리
 */

import { post, get } from './apiClient';
import { RegistrationType } from '../types/auth';
import { parseJwt } from '../utils/jwtUtils';

/**
 * 회원가입 (통합)
 * 백엔드 엔드포인트가 '/auth/signup' 하나이므로 통합 처리
 */
async function registerUser(data, role) {
  // 1. 백엔드 SignupRequest 스펙에 맞춰 데이터 매핑
  const requestBody = {
    email: data.email,
    password: data.password,
    role: role,
    // 백엔드 DB 저장을 위해 추가 정보 전송
    name: data.name,             // 구직자용 이름
    companyName: data.companyName, // 채용자용 회사명
    contact: data.contact,
    address: data.address
  };

  // 2. 요청 전송
  const response = await post('/auth/signup', requestBody);

  // 3. [자동 로그인 구현] 응답에 accessToken이 있으면 즉시 저장
  // (백엔드를 수정했기 때문에 이제 accessToken이 넘어옵니다)
  if (response.accessToken) {
    localStorage.setItem('token', response.accessToken);

    // [수정 포인트] response.name이 아니라, 입력받은 data.name을 사용해야 합니다.
    // 구직자는 data.name, 채용자는 data.companyName을 사용
    const user = {
      id: response.userId,
      email: response.email,
      role: response.role,
      name: data.name || data.companyName // 여기가 핵심 수정 사항입니다!
    };
    localStorage.setItem('user', JSON.stringify(user));

    // 프론트엔드 로직 편의를 위해 response에 user 객체 포함하여 반환
    return { ...response, user };
  }

  return response;
}

/**
 * 회원가입 (구직자)
 */
export async function registerJobSeeker(data) {
  // role을 'APPLICANT' (RegistrationType.JOB_SEEKER 값)로 전송
  return registerUser(data, RegistrationType.JOB_SEEKER);
}

/**
 * 회원가입 (채용자)
 */
export async function registerEmployer(data) {
  // role을 'RECRUITER' (RegistrationType.EMPLOYER 값)로 전송
  return registerUser(data, RegistrationType.EMPLOYER);
}

/**
 * 로그인
 */
export async function login(email, password) {
  const response = await post('/auth/login', { email, password });

  if (response.accessToken) {
    const token = response.accessToken;
    localStorage.setItem('token', token);
    
    // 토큰을 해석해서 정보 추출
    const decoded = parseJwt(token);
    
    // [주의] 로그인 직후에는 토큰에 '이름' 정보가 없다면 email만 저장됩니다.
    // 따라서 MainLayout.jsx에서 'user.name || user.email' 로 처리하는 것이 안전합니다.
    const user = { 
        id: decoded.sub,      // 사용자 ID
        role: decoded.role,   // 역할
        email: email,         // 이메일
        name: decoded.name || null // 토큰에 name이 있다면 넣고, 없으면 null
    }; 
    
    localStorage.setItem('user', JSON.stringify(user));
    
    return { ...response, user };
  }

  return response;
}

/**
 * 로그아웃
 */
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

/**
 * 현재 사용자 정보 조회
 */
export async function getCurrentUser() {
  // return get('/users/me'); 
  return null;
}

/**
 * 토큰 가져오기
 */
export function getToken() {
  return localStorage.getItem('token');
}

/**
 * 저장된 사용자 정보 가져오기
 */
export function getStoredUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

/**
 * 로그인 상태 확인
 */
export function isAuthenticated() {
  return !!getToken();
}