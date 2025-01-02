import express from 'express';

// Utils
import { uploadImage } from '../utils/multer';

// Controller
import { 
  signUp,
  signIn,
  signOut,
  getUserProfile,
  updateUserProfile,
	resetPassword,
} from '../controllers/userController';

// Middleware
import { verifyTokenMiddleware } from '../middlewares/verifyToken';

const router = express.Router();


// 사용자의 개인 정보를 관리하는 API
router.post('/', uploadImage.single('profile'), signUp);
router.post('/sign-in', signIn);
router.post('/sign-out', verifyTokenMiddleware, signOut);
router.get('/:userId', verifyTokenMiddleware, getUserProfile);
router.patch('/', uploadImage.single('profile'), verifyTokenMiddleware, updateUserProfile);
router.post('/reset-password', verifyTokenMiddleware, resetPassword);
// router.delete('/', verifyTokenMiddleware, deleteProfile);

export default router;
