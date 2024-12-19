import { Router } from 'express';

import userRoute from './userRoute';

const router: Router = Router();

router.use('/users', userRoute);

export default router;
