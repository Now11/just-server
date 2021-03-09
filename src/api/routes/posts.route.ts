import { Router, Request } from 'express';
import { PostController } from '../../controllers';
import { run } from '../../common/helpers';

const postController = new PostController();
const router = Router();

router.get(
	'/',
	run((req: Request) => postController.getUserPosts(req.query.ownerId as string))
);

router.get(
	'/:postId',
	run((req: Request) => postController.getPostById(req.user.id, Number(req.params.postId)))
);

router.post(
	'/',
	run((req: Request) => postController.createPost(req.user, req.body))
);

router.put(
	'/:postId',
	run((req: Request) => postController.updatePost(req.user.id, Number(req.params.postId), req.body))
);

router.delete(
	'/:postId',
	run((req: Request) => postController.deletePost(req.user.id, Number(req.params.postId)))
);

export default router;
