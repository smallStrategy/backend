import { Request, Response } from 'express';

import { hashPassword, comparePassword } from '../utils/bcrypt';
import { generateToken } from '../utils/jwtConfig';

export const login = (req: Request, res: Response) => {
  res.status(200).json({ message: 'login' });
}
