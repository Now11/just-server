import { getCustomRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { PostRepository } from '../data/repositories';

class PostService {
	async getPost(req: Request, res: Response): Promise<void> {
		const postRepository = getCustomRepository(PostRepository);
		const { id } = req.params;
		try {
			const post = await postRepository.getById(id);
			if (!post) {
				throw new Error('Post was not found');
			}
			res.send(post);
		} catch (error) {
			res.status(404).send(error.message);
		}
	}

	async createPost(req: Request, res: Response, next: NextFunction) {
		const { body } = req;
		const postRepository = getCustomRepository(PostRepository);
		try {
			await postRepository.createItem(body);
			res.status(201).send(body);
		} catch (error) {
			next(error);
		}
	}

	async getUserPosts(req: Request, res: Response, next: NextFunction) {
		const { ownerId } = req.query;

		const postRepository = getCustomRepository(PostRepository);
		try {
			let posts = await postRepository.findAllByUserId(ownerId as string);

			if (!ownerId) {
				posts = await postRepository.getAll();
			}
			res.status(200).send(posts);
		} catch (error) {
			next(error);
		}
	}

	async getAllPosts(req: Request, res: Response, next: NextFunction) {
		const postRepository = getCustomRepository(PostRepository);
		try {
			const posts = await postRepository.getAll();
			res.status(200).send(posts);
		} catch (error) {
			res.send(error);
		}
	}

	// async deletePost(req: Request, res: Response, next: NextFunction){
	//     const { id } = req.params;
	// 	const postRepository = getCustomRepository(PostRepository);
	// }

	// async update(req: Request, res: Response, next: NextFunction) {
	// 	const { body } = req;
	// 	const postRepository = getCustomRepository(PostRepository);
	// 	try {
	// 		const { id, ...rest } = body;
	// 		const post = await postRepository.updateById(id, rest);
	// 		res.status(200).send(post);
	// 	} catch (error) {}
	// }
}
export { PostService };
