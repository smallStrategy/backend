import { Request, Response, NextFunction } from 'express';

// Content-Type을 'application/json'으로 설정하는 미들웨어
export const setJsonContentType = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Type', 'application/json');
  next();
};

