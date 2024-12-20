import express from 'express';

// Utils
import { uploadImage } from '../utils/multer';

// Controller
import { 
  signUp,
  signIn,
  signOut,
} from '../controllers/userController';

const router = express.Router();

router.post('/', uploadImage.single('profile'), signUp);
router.post('/sign-in', signIn);
router.post('/sign-out', signOut);

export default router;
