import bcrypt from 'bcryptjs';

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

// 비밀번호 암호화
export const hashPassword = ({password}:{password: string}) => {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);  // salt 생성
  return bcrypt.hashSync(password, salt);  // 암호화된 비밀번호 반환
};

// 비밀번호 비교
interface ComparePasswordProps {
  password: string;
  hashedPassword: string;
}
export const comparePassword = ({password, hashedPassword}: ComparePasswordProps): boolean => {
  return bcrypt.compareSync(password, hashedPassword);  // 비밀번호 비교
};
