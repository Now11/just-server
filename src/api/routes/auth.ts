import { Router } from 'express';
import { AuthService } from '../../services';
import { loginMiddleware } from '../middlewares/login.middleware';
import { registrationMiddleware } from '../middlewares/register.middleware';

const router = Router();
const authService = new AuthService();

router.post('/login', loginMiddleware, authService.login);

router.post('/register', registrationMiddleware, authService.login);

export default router;
