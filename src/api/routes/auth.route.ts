import { Router, Request } from 'express';
import { AuthService } from '../../services';
import { loginMiddleware } from '../middlewares/login.middleware';
import { registrationMiddleware } from '../middlewares/register.middleware';
import { run } from '../../common/helpers';

const router = Router();
const authService = new AuthService();

router.post(
	'/login',
	loginMiddleware,
	run((req: Request) => authService.login(req.user))
);

router.post(
	'/register',
	registrationMiddleware,
	run((req: Request) => authService.register(req.body))
);

export default router;
