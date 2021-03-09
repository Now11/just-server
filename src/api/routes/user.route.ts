import { Router, Request } from 'express';
import { run } from '../../common/helpers';
import { UserController } from '../../controllers';

const userController = new UserController();
const router = Router();

router.get(
	'/:id',
	run((req: Request) => userController.getUserById(req.params.id))
);

router.put(
	'/:id',
	run((req: Request) => userController.updateUser(req.user.id, req.params.id, req.body))
);

export default router;
