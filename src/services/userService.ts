import { Database } from '../db/index';
import { UserEntity } from '../db/entities/userEntity';
import { UserTokenEntity } from '../db/entities/userTokenEntity';

import { hashPassword, comparePassword } from '../utils/bcrypt';
import { generateToken } from '../utils/jwtConfig';

const userRepository = Database.getRepository(UserEntity);
const userTokenRepository = Database.getRepository(UserTokenEntity);

// 사용자가 입력한 회원가입 정보가 유효한지 확인하는 함수
interface ValidSignUpInput {
  username: string;
  email: string;
  password: string;
}
export const validSignUpInput = (validProps: ValidSignUpInput) => {
  if (!validProps.username || !validProps.email || !validProps.password) {
    throw new Error('Username and email are required');
  }
  return;
}

// 사용자 회원가입 함수
interface SignUpProps {
  username: string;
  email: string;
  password: string;
  profile?: string;
}
export const signUp = async (signUpProps : SignUpProps): Promise<UserEntity> => {
  try {
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
  } catch(error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Internal Server Error');
  }
}

// 사용자가 입력한 로그인 정보가 유효한지 확인하는 함수
interface ValidSignInInput {
  email: string;
  password: string;
}
export const validSignInInput = (validProps: ValidSignInInput) => {
  if (!validProps.email || !validProps.password) {
    throw new Error('Email and password are required');
  }
  return;
}

// 사용자 로그인 함수
interface SignInProps {
  email: string;
  password: string;
}
export const signIn = async (signInProps: SignInProps): Promise<{ token: string, user: UserEntity }> => {
  try {
    const findUser = await userRepository.findOne({
      where: { email: signInProps.email }
    });
    if (!findUser) {
      throw new Error('User not found');
    }

    // compare password
    if (!comparePassword({password: signInProps.password, hashedPassword: findUser.password})) {
      throw new Error('Password is incorrect');
    }

    // create Token
    const token = generateToken({userId: findUser.id, role: findUser.role})

    // delete old token 
    await userTokenRepository.delete({ user: findUser });

    // save token to Database
    const userToken = userTokenRepository.create({
      token,
      user: findUser,
      expires_at: new Date(Date.now() + 3600 * 1000),
    });
    await userTokenRepository.save(userToken);

    return { token, user: findUser };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Internal Server Error');
  }
}
