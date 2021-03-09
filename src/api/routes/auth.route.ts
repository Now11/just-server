import { Router, Request } from 'express';
import { AuthController } from '../../controllers';
import { loginMiddleware } from '../middlewares/login.middleware';
import { registrationMiddleware } from '../middlewares/register.middleware';
import { run } from '../../common/helpers';

const router = Router();
const auth = new AuthController();

router.post(
	'/login',
	loginMiddleware,
	run((req: Request) => auth.login(req.user))
);

router.post(
	'/register',
	registrationMiddleware,
	run((req: Request) => auth.register(req.body))
);

export default router;
