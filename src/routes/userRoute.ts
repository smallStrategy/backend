import express from 'express';
const router = express.Router();

import { signUp } from '../controllers/userController';

// Login
router.post('/', signUp);

export default router;
