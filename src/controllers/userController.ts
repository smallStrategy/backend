import { Request, Response } from 'express';

import { responseSuccess, responseError } from "../utils/response";

import {
  signUp as signUpService,
} from '../services/userService';

// @route put /users/
// @body { username, email, password, profile } 
// TODO : profile 이미지 추가 기능 구현
// TODO : 
export const signUp = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const createdUser = await signUpService({username, email, password});
    responseSuccess(res, createdUser, 'User created successfully', 201);
    return
  } catch (error) {
    const err = error as Error;
    responseError(res, err.message, 'Failed to create user', 400);
    return
  }
}
