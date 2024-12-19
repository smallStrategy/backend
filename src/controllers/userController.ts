import { Request, Response } from 'express';

import { responseSuccess, responseError } from "../utils/response";

import {
  signUp as signUpService,
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
    if (error instanceof Error) {
      responseError(res, error.message, 'Failed to create user', 400);
      return
    }
    responseError(res, 'Internal Server Error', 'Failed to create user', 500);
    return
  }
}
