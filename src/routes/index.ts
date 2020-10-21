import { Router } from 'express';
import usersRoutes from './user.routes';
import authRoutes from './auth.routes';

const routes = Router();

routes.use('/auth', authRoutes).use('/user', usersRoutes);

export default routes;
