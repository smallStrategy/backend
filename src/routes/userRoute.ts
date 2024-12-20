import express from 'express';

// Utils
import { uploadImage } from '../utils/multer';

// Controller
import { 
  signUp,
  signIn,
} from '../controllers/userController';

const router = express.Router();

router.post('/', uploadImage.single('profile'), signUp);
router.post('/login', signIn);


export default router;
