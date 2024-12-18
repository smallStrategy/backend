import { Router } from 'express';

import userRoute from './userRoute';

const router: Router = Router();

router.use('/user', userRoute);

export default router;
