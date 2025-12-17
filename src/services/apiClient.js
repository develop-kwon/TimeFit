/**
 * API Client Configuration
 * RESTful API 통신을 위한 기본 설정 및 유틸리티 함수
 */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

/**
 * API 요청 전용 fetch 래퍼
 * @param {string} endpoint - API 엔드포인트 (예: '/auth/login')
 * @param {RequestInit} options - fetch 옵션
 * @returns {Promise<Response>}
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('token');

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // JWT 토큰이 있으면 Authorization 헤더에 추가
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    // 응답이 JSON이 아닌 경우 처리
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: response.statusText || 'An error occurred',
      }));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    // 204 No Content 등의 경우 빈 응답 처리
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    // 네트워크 오류 등 처리
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to the server');
    }
    throw error;
  }
}

/**
 * GET 요청
 */
export const get = (endpoint, options = {}) => {
  return apiRequest(endpoint, { ...options, method: 'GET' });
};

/**
 * POST 요청
 */
export const post = (endpoint, data, options = {}) => {
  return apiRequest(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * PUT 요청
 */
export const put = (endpoint, data, options = {}) => {
  return apiRequest(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

/**
 * PATCH 요청
 */
export const patch = (endpoint, data, options = {}) => {
  return apiRequest(endpoint, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

/**
 * DELETE 요청
 */
export const del = (endpoint, options = {}) => {
  return apiRequest(endpoint, { ...options, method: 'DELETE' });
};

export default {
  get,
  post,
  put,
  patch,
  delete: del,
  request: apiRequest,
};
