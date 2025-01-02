import { Database } from '../db/index';
import { UserEntity } from '../db/entities/userEntity';
import { UserTokenEntity } from '../db/entities/userTokenEntity';

import { handleError } from '../utils/error';
import { hashPassword, comparePassword } from '../utils/bcrypt';
import { generateToken } from '../utils/jwtConfig';
import { deleteUserProfile } from '../utils/fs';
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
export const signOut = async (userId: number): Promise<void> => {
  try {
    await userTokenRepository.delete({ userId: userId });
  } catch (error) {
    handleError({error, message: 'Invalid token'});
    throw error;
  }
}

// 사용자 프로필 조회 함수 
interface GetUserProfileProps {
  userId: number;
}
interface GetUserProfileResponse {
  id: number;
  username: string;
  email: string;
  bio: string;
  profile: string;
  createdAt: Date;
}
export const getUserProfile = async (getProps: GetUserProfileProps): Promise<GetUserProfileResponse> => {
  try {
    const findUser = await userRepository.findOne({
      where: { id: getProps.userId }
    });
    if (!findUser) {
      throw new Error('User not found');
    }
    const { password, role, ...userProfile } = findUser;
    return userProfile;
  } catch (error) {
    handleError({error, message: 'User not found'});
    throw error;
  }
}

// 사용자 프로필 수정 함수
interface UpdateUserProfileProps {
  userId: number;
  username: string;
  password: string;
  bio: string;
  profile?: string; // 만약 profile이 있다면 기존 profile을 삭제하고 새로운 profile을 저장
}
export const updateUserProfile = async (updateProps: UpdateUserProfileProps): Promise<void> => {
  try {
    const findUser = await userRepository.findOne({
      where: { id: updateProps.userId }
    });
    if (!findUser) {
      throw new Error('User not found');
    }
    if (!comparePassword({password: updateProps.password, hashedPassword: findUser.password})) {
      throw new Error('Password is incorrect');
    }
    // update user profile data
    findUser.username = updateProps.username;
    findUser.bio = updateProps.bio;
    // if profile exists, delete old profile and save new profile
    if (updateProps.profile) {
      if (findUser.profile) {
        deleteUserProfile(findUser.profile);
      }
      findUser.profile = updateProps.profile;
    }
    // 업데이트 해준 후 저장
    await userRepository.save(findUser);
    return
  } catch (error) {
    handleError({error, message: 'Failed to update user profile'});
    throw error;
  }
}

// 사용자 비밀번호 수정 함수
interface ResetPasswordProps {
	userId: number;
	oldPassword: string;
	newPassword: string;
}
export const resetPassword = async (resetProps: ResetPasswordProps): Promise<void> => {
	try {
		const findUser = await userRepository.findOne({
			where: { id: resetProps.userId }
		});
		if (!findUser) {
			throw new Error('User not found');
		}
		// check copmare password
		if (!comparePassword({password: resetProps.oldPassword, hashedPassword: findUser.password})) {
			throw new Error('Password is incorrect');
		}
		// hash new password
		const hashedPassword = hashPassword({password: resetProps.newPassword});
		// update password
		findUser.password = hashedPassword;
		await userRepository.save(findUser);
		return
	} catch (error) {
		handleError({error, message: 'Failed to reset password'});
	}
}
