import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

interface UserPayload extends JwtPayload {
  userId: number;
  role: number;
}

// JWT 생성 함수
interface GenerateTokenProps {
  userId: number;
  role: number;
}
export const generateToken = (generateProps: GenerateTokenProps): string => {
  if (!JWT_SECRET) {
    throw new Error('cannot find JWT_SECRET');
  }
  const payload: UserPayload = { userId: generateProps.userId, role: generateProps.role }; // payload는 사용자 고유 정보
  const options = { expiresIn: '1h' }; // 1시간 유효한 토큰
  return jwt.sign(payload, JWT_SECRET, options);
};

// JWT 검증 함수
export const verifyToken = (token: string): UserPayload | null => {
  if (!JWT_SECRET) {
    throw new Error('cannot find JWT_SECRET');
  }
  try {
    return jwt.verify(token, JWT_SECRET) as UserPayload;
  } catch (error) {
    return null;
  }
};

// JWT 생성 시에 사용했었던 payload를 반환하는 함수
export const decodeToken = (token: string): UserPayload | null => {
  const decoded = jwt.decode(token);
  if (decoded && typeof decoded === 'object' && 'userId' in decoded && 'role' in decoded) {
    return decoded as UserPayload;
  }
  return null;
};
