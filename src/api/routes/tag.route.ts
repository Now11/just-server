import { Router, Request } from 'express';
import { run } from '../../common/helpers';
import { TagService } from '../../services';

const tagService = new TagService();
const router = Router();

router.get(
	'/',
	run((req: Request) => tagService.getTags())
);

router.post(
	'/',
	run((req: Request) => tagService.createTag(req.body))
);

export default router;
