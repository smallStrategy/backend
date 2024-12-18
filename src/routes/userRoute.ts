import express from 'express';
const router = express.Router();

import { login } from '../controllers/userController';

// Login
router.post('/', login);

export default router;
