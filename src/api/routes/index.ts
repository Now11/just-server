import { Router } from 'express';
import usersRoutes from './user.route';
import authRoutes from './auth.route';
import postRoutes from './posts.route';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/post', postRoutes);

export default router;
