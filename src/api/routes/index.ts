import { Router } from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import postRoutes from './posts.route';
import tagRoutes from './tag.route';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/post', postRoutes);
router.use('/tags', tagRoutes);

export default router;
