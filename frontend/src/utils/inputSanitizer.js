/**
 * Input Sanitizer Utility
 * 사용자 입력을 sanitize하여 XSS 공격을 방지합니다.
 */

/**
 * HTML 태그를 제거하고 텍스트만 반환
 * @param {string} input - 입력 문자열
 * @returns {string} sanitized 문자열
 */
export function sanitizeText(input) {
  if (typeof input !== 'string') {
    return '';
  }

  // HTML 태그 제거
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * 이메일 형식 검증 및 sanitize
 * @param {string} email - 이메일 주소
 * @returns {string} sanitized 이메일 또는 빈 문자열
 */
export function sanitizeEmail(email) {
  if (typeof email !== 'string') {
    return '';
  }

  // 공백 제거 및 소문자 변환
  const cleaned = email.trim().toLowerCase();

  // 이메일 형식 검증
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleaned)) {
    return '';
  }

  return cleaned;
}

/**
 * 전화번호 형식 검증 및 sanitize
 * @param {string} phone - 전화번호
 * @returns {string} sanitized 전화번호 또는 빈 문자열
 */
export function sanitizePhone(phone) {
  if (typeof phone !== 'string') {
    return '';
  }

  // 숫자와 하이픈, 공백만 허용
  const cleaned = phone.replace(/[^\d\s-]/g, '').trim();

  // 최소 길이 검증 (예: 010-1234-5678)
  if (cleaned.length < 10) {
    return '';
  }

  return cleaned;
}

/**
 * 숫자만 추출
 * @param {string} input - 입력 문자열
 * @returns {string} 숫자만 포함된 문자열
 */
export function sanitizeNumber(input) {
  if (typeof input !== 'string') {
    return '';
  }

  return input.replace(/\D/g, '');
}

/**
 * URL 검증 및 sanitize
 * @param {string} url - URL 문자열
 * @returns {string} sanitized URL 또는 빈 문자열
 */
export function sanitizeUrl(url) {
  if (typeof url !== 'string') {
    return '';
  }

  try {
    const urlObj = new URL(url);
    // http와 https만 허용
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return '';
    }
    return urlObj.toString();
  } catch {
    return '';
  }
}

/**
 * 일반적인 입력 필드 sanitize (이름, 주소 등)
 * @param {string} input - 입력 문자열
 * @param {number} maxLength - 최대 길이
 * @returns {string} sanitized 문자열
 */
export function sanitizeInput(input, maxLength = 500) {
  if (typeof input !== 'string') {
    return '';
  }

  // 앞뒤 공백 제거
  let cleaned = input.trim();

  // 최대 길이 제한
  if (cleaned.length > maxLength) {
    cleaned = cleaned.substring(0, maxLength);
  }

  // HTML 태그 제거
  cleaned = sanitizeText(cleaned);

  return cleaned;
}

