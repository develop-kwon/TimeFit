/**
 * JWT 토큰 디코딩 유틸리티
 */
export function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Invalid Token:', e);
    return null;
  }
}

/**
 * 토큰 만료 여부 확인
 */
export function isTokenExpired(token) {
  const decoded = parseJwt(token);
  if (!decoded || !decoded.exp) return true;
  
  // exp는 초 단위, Date.now()는 밀리초 단위이므로 변환 필요
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
}