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
  // Check if user already exists [ username, email ]
  const existingUser = await userRepository.findOne({
    where: [
      { username: signUpProps.username },
      { email: signUpProps.email }
    ]
  });
  if (existingUser) {
    throw new Error('User already exists');
  }
  // Hash password
  const hashedPassword = hashPassword({password: signUpProps.password});
  // Create new user
  const newUser = userRepository.create({
    ...signUpProps,
    password: hashedPassword
  })
  // Save user to database
  return await userRepository.save(newUser);
}
