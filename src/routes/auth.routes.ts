import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import login from '../middleware/login.middleware';
import register from '../middleware/register.middleware';

const router = Router();
const authController = new AuthController();

router.post('/login', login, authController.login).post('/register', register, authController.login);

export default router;
