/**
 * Authentication Service
 * JWT 기반 인증 관련 API 호출 및 토큰 관리
 */

import { post, get } from './apiClient';

/**
 * 회원가입 (구직자)
 * @param {Object} data - 회원가입 데이터
 * @param {string} data.name - 이름
 * @param {string} data.email - 이메일
 * @param {string} data.password - 비밀번호
 * @param {string} data.contact - 연락처
 * @param {string} data.address - 주소
 * @param {string[]} data.jobCategories - 관심 직종 배열
 * @returns {Promise<Object>} 응답 데이터
 */
export async function registerJobSeeker(data) {
  const response = await post('/auth/register/job-seeker', data);

  // 회원가입 성공 시 토큰 저장
  if (response.token) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
  }

  return response;
}

/**
 * 회원가입 (채용자)
 * @param {Object} data - 회원가입 데이터
 * @param {string} data.companyName - 업체명
 * @param {string} data.email - 이메일
 * @param {string} data.password - 비밀번호
 * @param {string} data.contact - 연락처
 * @param {string} data.address - 주소
 * @returns {Promise<Object>} 응답 데이터
 */
export async function registerEmployer(data) {
  const response = await post('/auth/register/employer', data);

  // 회원가입 성공 시 토큰 저장
  if (response.token) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
  }

  return response;
}

/**
 * 로그인
 * @param {string} email - 이메일
 * @param {string} password - 비밀번호
 * @returns {Promise<Object>} { token, user } 형태의 응답
 */
export async function login(email, password) {
  const response = await post('/auth/login', { email, password });

  // JWT 토큰을 localStorage에 저장
  if (response.token) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
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
 * @returns {Promise<Object>} 사용자 정보
 */
export async function getCurrentUser() {
  return get('/auth/me');
}

/**
 * 토큰 가져오기
 * @returns {string|null} JWT 토큰
 */
export function getToken() {
  return localStorage.getItem('token');
}

/**
 * 저장된 사용자 정보 가져오기
 * @returns {Object|null} 사용자 정보
 */
export function getStoredUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

/**
 * 로그인 상태 확인
 * @returns {boolean} 로그인 여부
 */
export function isAuthenticated() {
  return !!getToken();
}
