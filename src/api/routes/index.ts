import { Router } from 'express';
import usersRoutes from './user';
import authRoutes from './auth';
import postRoutes from './post';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', usersRoutes);
router.use('/posts', postRoutes);

export default router;
