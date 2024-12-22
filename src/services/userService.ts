import { Database } from '../db/index';
import { UserEntity } from '../db/entities/userEntity';
import { UserTokenEntity } from '../db/entities/userTokenEntity';

import { handleError } from '../utils/error';
import { hashPassword, comparePassword } from '../utils/bcrypt';
import { generateToken, decodeToken } from '../utils/jwtConfig';
import { validSignUpInput, validSignInInput } from '../utils/validation/authValidation';

const userRepository = Database.getRepository(UserEntity);
const userTokenRepository = Database.getRepository(UserTokenEntity);

// 사용자 회원가입 함수
interface SignUpProps {
  username: string;
  email: string;
  password: string;
  profile?: string;
}
export const signUp = async (signUpProps : SignUpProps): Promise<UserEntity> => {
  try {
    validSignUpInput(signUpProps);

    const existingUser = await userRepository.findOne({
      where: [
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
    handleError({error, message: 'User already exists'});
    throw error
  }
}

// 사용자 로그인 함수
interface SignInProps {
  email: string;
  password: string;
}
export const signIn = async (signInProps: SignInProps): Promise<{ token: string, user: UserEntity }> => {
  try {
    validSignInInput(signInProps);

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
    handleError({error, message: 'User not found'});
    throw error;
  }
}

// 사용자 로그아웃 함수
export const signOut = async (token: string): Promise<void> => {
  try {
    const decodedToken = decodeToken(token);
    if (!decodedToken) {
      throw new Error('Invalid token');
    }
    const { userId } = decodedToken;
    await userTokenRepository.delete({ userId: userId });
  } catch (error) {
    handleError({error, message: 'Invalid token'});
    throw error;
  }
}

// 사용자 프로필 조회 함수 
/*
interface GetUserProfileProps {
  userId: number;
}
export const getUserProfile = async (getProps: GetUserProfileProps): Promise<UserEntity> => {
  try {
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Internal Server Error');
  }
}
*/
