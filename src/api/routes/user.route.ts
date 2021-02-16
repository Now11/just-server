import { Router, Request } from 'express';
import { run } from '../../common/helpers';
import { UserService } from '../../services/user.service';

const userService = new UserService();
const router = Router();

router.get(
	'/:id',
	run((req: Request) => userService.getUserById(req.params.id))
);

export default router;
