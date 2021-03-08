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
	'/:postId',
	run((req: Request) => postService.getPostById(req.user.id, Number(req.params.postId)))
);

router.post(
	'/',
	run((req: Request) => postService.createPost(req.user.id, req.body))
);

router.put(
	'/:postId',
	run((req: Request) => postService.updatePost(req.user.id, Number(req.params.postId), req.body))
);

router.delete(
	'/:postId',
	run((req: Request) => postService.deletePost(req.user.id, Number(req.params.postId)))
);

export default router;
