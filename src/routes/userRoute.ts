import express from 'express';

// Utils
import { uploadImage } from '../utils/multer';

// Controller
import { signUp } from '../controllers/userController';

const router = express.Router();

// signUp
router.post('/', uploadImage.single('profile'), signUp);

export default router;
