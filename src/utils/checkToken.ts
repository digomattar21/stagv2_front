import jwt_decode from 'jwt-decode';

interface DecodedToken {
  exp: number;
}

export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;

  try {
    const decodedToken: DecodedToken = jwt_decode(token);
    if (Date.now() >= decodedToken.exp * 1000) {
      return false;
    }
    return true;
  } catch (error) {
    console.error('Invalid token:', error);
    return false;
  }
};
