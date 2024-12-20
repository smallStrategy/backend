import { Request, Response } from 'express';

import { responseSuccess, responseError } from "../utils/response";

import {
  signUp as signUpService,
  validSignUpInput as validSignUpInputService,
  signIn as signInService,
  validSignInInput as validSignInInputService
} from '../services/userService';

// @route put /users/
// @body { username, email, password, profile } 
export const signUp = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    validSignUpInputService({username, email, password});

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

// @route post /users/login
// @body { email, password }
export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    validSignInInputService({email, password});

    const { token, user } = await signInService({email, password});
    responseSuccess(res, { token, user }, 'User logged in successfully', 200);
    return
  } catch (error) {
    if (error instanceof Error) {
      responseError(res, error.message, 'Failed to login', 400);
      return
    }
    responseError(res, 'Internal Server Error', 'Failed to login', 500);
    return
  }
}
