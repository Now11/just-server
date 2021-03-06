import { getCustomRepository } from 'typeorm';
import { HttpStatusCode } from '../common/enums';
import { CustomError } from '../common/helpers';
import { IPost } from '../common/models';
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

	async createPost(userId: string, data: IPost) {
		const postRepository = getCustomRepository(PostRepository);

		// @ts-ignore
		const newPost = await postRepository.createItem({ ...data, owner: userId });

		const { createdAt, updatedAt, id, ...post } = newPost;
		if (!newPost) {
			throw new CustomError(HttpStatusCode.BAD_REQUEST, 'Bad request');
		}

		return { id, post };
	}

	async getPostById(userId: string, postId: string) {
		const postRepository = getCustomRepository(PostRepository);
		const post = await postRepository.findById(postId);

		if (!post) {
			throw new CustomError(HttpStatusCode.NOT_FOUND, 'Post was not found');
		}

		if (post.owner.id !== userId) {
			throw new CustomError(HttpStatusCode.FORBIDDEN, "You don't have permissions to update the post");
		}

		return post;
	}

	async updatePost(userId: string, postId: string, postData: IPost) {
		const postRepository = getCustomRepository(PostRepository);
		const post = await postRepository.findById(postId);

		if (!post) {
			throw new CustomError(HttpStatusCode.NOT_FOUND, 'Post was not found');
		}

		if (post.owner.id !== userId) {
			throw new CustomError(HttpStatusCode.FORBIDDEN, "You don't have permissions to update the post");
		}

		const { createdAt, updatedAt, id, owner, ...data } = postData;
		const updatePost = await postRepository.updateById(postId, data);

		return updatePost;
	}

	async deletePost(userId: string, postId: string) {
		const postRepository = getCustomRepository(PostRepository);
		const post = await postRepository.findById(postId);

		if (!post) {
			throw new CustomError(HttpStatusCode.NOT_FOUND, 'Post was not found');
		}

		if (post.owner.id !== userId) {
			throw new CustomError(HttpStatusCode.FORBIDDEN, "You don't have permissions to delete the post");
		}

		await postRepository.deleteById(postId);

		return { success: true };
	}
}
export { PostService };
