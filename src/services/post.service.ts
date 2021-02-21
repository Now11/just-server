import { getCustomRepository } from 'typeorm';
import { HttpStatusCode } from '../common/enums';
import { CustomError } from '../common/helpers';
import { IPost } from '../common/models/post';
import { PostRepository } from '../data/repositories';

class PostService {
	async getUserPosts(ownerId: string) {
		const postRepository = getCustomRepository(PostRepository);
		const posts = postRepository.findAllByOwnerId(ownerId);
		if (!posts) {
			throw new CustomError(HttpStatusCode.NOT_FOUND, 'Posts were not found');
		}
		return posts;
	}

	async createPost(data: IPost) {
		try {
			const postRepository = getCustomRepository(PostRepository);
			const post = await postRepository.createItem(data);

			if (!post) {
				throw new CustomError(HttpStatusCode.BAD_REQUEST, 'Bad request');
			}

			return data;
		} catch (err) {
			throw new CustomError(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Internal server error');
		}
	}

	async getPostById(id: string) {
		const postRepository = getCustomRepository(PostRepository);
		const post = await postRepository.getById(id);
		if (!post) {
			throw new CustomError(HttpStatusCode.NOT_FOUND, 'Post was not found');
		}
		return post;
	}
}
export { PostService };
