import { Router, Request } from 'express';
import { PostService } from '../../services';
import { run } from '../../common/helpers';

const postService = new PostService();
const router = Router();

router.get(
	'/',
	run((req: Request) => postService.getUserPosts(req.query.ownerId as string))
);

router.get(
	'/:id',
	run((req: Request) => postService.getPostById(req.params.id))
);

router.post(
	'/',
	run((req: Request) => postService.createPost(req.body))
);

export default router;
