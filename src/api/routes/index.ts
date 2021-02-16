import { Router } from 'express';
import usersRoutes from './user.route';
import authRoutes from './auth.route';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', usersRoutes);

export default router;
