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
	run((req: Request) => postService.getPostById(req.user.id, req.params.id))
);

router.post(
	'/',
	run((req: Request) => postService.createPost(req.user.id, req.body))
);

router.put(
	'/:id',
	run((req: Request) => postService.updatePost(req.user.id, req.params.id, req.body))
);

router.delete(
	'/:id',
	run((req: Request) => postService.deletePost(req.user.id, req.params.id))
);

export default router;
