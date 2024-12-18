import bcrypt from 'bcryptjs';

// 비밀번호 암호화
export const hashPassword = ({password}:{password: string}) => {
  const salt = bcrypt.genSaltSync(10);  // salt 생성
  return bcrypt.hashSync(password, salt);  // 암호화된 비밀번호 반환
};

// 비밀번호 비교
export const comparePassword = ({password, hashedPassword}:{password: string, hashedPassword: string}) => {
  return bcrypt.compareSync(password, hashedPassword);
};
