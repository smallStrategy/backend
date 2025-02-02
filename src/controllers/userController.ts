import { Request, Response } from 'express';

import { handleControllerError } from "../utils/error";
import { responseSuccess } from "../utils/response";

import {
	signUp as signUpService,
	signIn as signInService,
	signOut as signOutService,
	getUserProfile as getUserProfileService,
	updateUserProfile as updateUserProfileService,
	resetPassword as resetPasswordService,
} from '../services/userService';

// @route put /users/
// @body { username, email, password, profile } 
export const signUp = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const profile = req.file?.filename;
    const createdUser = await signUpService({username, email, password, profile});

    responseSuccess(res, createdUser, 'User created successfully', 201);
    return
  } catch (error) {
    handleControllerError({res, error, message: 'Failed to create user', statusCode: 400});
  }
}

// @route post /users/login
// @body { email, password }
export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { token, user } = await signInService({email, password});
    responseSuccess(res, { token, user }, 'User logged in successfully', 200);
    return
  } catch (error) {
    handleControllerError({res, error, message: 'Failed to login', statusCode: 400});
  }
}

// 로그아아웃
// @route post /users/logout
// @header Authorization Bearer token
export const signOut = async (req: Request, res: Response) => {
  try {
    await signOutService(req.body.userId);
    responseSuccess(res, undefined, 'User logged out successfully', 200);
    return
  } catch (error) {
    handleControllerError({res, error, message: 'Failed to logout', statusCode: 400});
  }
}

// 사용자 프로필 조회
// @route get /users/:userId
// @header Authorization Bearer token
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const userProfile = await getUserProfileService({userId});
    responseSuccess(res, userProfile, 'User profile fetched successfully', 200);
    return
  } catch (error) {
    handleControllerError({res, error, message: 'Failed to fetch user profile', statusCode: 400});
  }
}

// 사용자 프로필 수정
// @route patch /users
// @header Authorization Bearer token
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { username, password, bio } = req.body;
    const profile = req.file?.filename;

    await updateUserProfileService({userId: req.body.userId, username, password, bio, profile});
    responseSuccess(res, null, 'User profile updated successfully', 200);
    return
  } catch (error) {
    handleControllerError({res, error, message: 'Failed to update user profile', statusCode: 400});
  }
}

// 사용자 비밀번호 변경 
// @ route patch /users/reset-password
// @ header Authorization Bearer token
export const resetPassword = async (req: Request, res: Response) => {
	try {
		const { oldPassword, newPassword } = req.body;
		await resetPasswordService({userId: req.body.userId, oldPassword, newPassword});
		responseSuccess(res, null, 'Password reset successfully', 200);
	} catch (error) {
		handleControllerError({res, error, message: 'Failed to reset password', statusCode: 400});
	}
}
