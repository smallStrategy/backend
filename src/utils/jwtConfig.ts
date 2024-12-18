// jwtConfig.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET

// JWT 생성 함수
export const generateToken = ({userId}:{userId: string}) => {
  if (!JWT_SECRET) {
    throw new Error('cannot find JWT_SECRET');
  }
  const payload = { userId }; // payload는 사용자 고유 정보
  const options = { expiresIn: '1h' }; // 1시간 유효한 토큰
  return jwt.sign(payload, JWT_SECRET, options);
};

// JWT 검증 함수
export const verifyToken = (token: string) => {
  if (!JWT_SECRET) {
    throw new Error('cannot find JWT_SECRET');
  }
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
