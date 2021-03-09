import { Router, Request } from 'express';
import { run } from '../../common/helpers';
import { TagController } from '../../controllers';

const tagController = new TagController();
const router = Router();

router.get(
	'/',
	run((req: Request) => tagController.getTags())
);

router.post(
	'/',
	run((req: Request) => tagController.createTag(req.body))
);

export default router;
