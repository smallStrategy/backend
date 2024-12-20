import { Request, Response, NextFunction } from 'express';

import { Database } from '../db/index';
import { UserTokenEntity } from '../db/entities/userTokenEntity';

import { responseError } from "../utils/response";

const userTokenRepository = Database.getRepository(UserTokenEntity);

export const verifyTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      responseError(res, 'Unauthorized', 'Token is required', 401);
      return
    }

    const existingToken = await userTokenRepository.findOne({
      where: { token: token }
    });
    if (!existingToken) {
      responseError(res, 'Unauthorized', 'Invalid token', 401);
      return
    }

    // 요청 시간 기준으로 1시간이 지났다면 토큰을 삭제하고 에러를 반환
    const currentTime = new Date().getTime();
    if (existingToken.expires_at.getTime() < currentTime) {
      await userTokenRepository.remove(existingToken);
      responseError(res, 'Unauthorized', 'Token expired', 401);
      return
    }

    next();
  } catch (error) {
    if (error instanceof Error) {
      responseError(res, error.message, 'Failed to login', 400);
      return
    }
    responseError(res, 'Internal Server Error', 'Failed to login', 500);
    return
  }
};
