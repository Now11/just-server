import { Router, Request } from 'express';
import { run } from '../../common/helpers';
import { UserService } from '../../services';

const userService = new UserService();
const router = Router();

router.get(
	'/:id',
	run((req: Request) => userService.getUserById(req.params.id))
);

router.put(
	'/:id',
	run((req: Request) => userService.updateUser(req.user.id, req.params.id, req.body))
);

export default router;
