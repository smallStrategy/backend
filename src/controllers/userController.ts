import { Request, Response } from 'express';

import {} from '../utils/bcrypt';
import { generateToken } from '../utils/jwtConfig';

export const login = (req: Request, res: Response) => {
  const { username, password }: { username: string, password: string } = req.body;
  const userId = 'test_id'

  const token = generateToken({ userId });
  res.status(200).json({ token });
}
