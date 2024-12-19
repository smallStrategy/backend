import { Database } from '../db/index';
import { User } from '../db/entities/userEntity';

import { hashPassword } from '../utils/bcrypt';

interface SignUpProps {
  username: string;
  email: string;
  password: string;
}

const userRepository = Database.getRepository(User);

export const signUp = async (signUpProps : SignUpProps) => {
  const existingUser = await userRepository.findOne({
    where: [
      { username: signUpProps.username },
      { email: signUpProps.email }
    ]
  });
  if (existingUser) {
    throw new Error('User already exists');
  }
  // 비밀번호 암호화
  const hashedPassword = hashPassword({password: signUpProps.password});
  const newUser = userRepository.create({
    ...signUpProps,
    password: hashedPassword
  })
  return await userRepository.save(newUser);
}
