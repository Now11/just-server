import { INewPost, IPost, IUpdatePost } from '../common/models';
import req from '../httpRequest';
import { BaseController } from './base.controller';

export class PostsController extends BaseController {
	async createNew(data: INewPost, throwHttpErrors = true) {
		const { body, statusCode } = await req.post<IPost>(
			{ url: 'post', body: data },
			{ throwHttpErrors, headers: { Authorization: `Bearer ${this.params.token}` } }
		);

		return {
			body,
			statusCode
		};
	}

	async update(id: number, data: IUpdatePost, throwHttpErrors = true) {
		const { body, statusCode } = await req.put<IPost>(
			{ url: `post/${id}`, body: data },
			{ throwHttpErrors, headers: { Authorization: `Bearer ${this.params.token}` } }
		);

		return {
			body,
			statusCode
		};
	}

	async delete(id: number, throwHttpErrors = true) {
		const { body, statusCode } = await req.delete<IPost>(
			{ url: `post/${id}` },
			{ throwHttpErrors, headers: { Authorization: `Bearer ${this.params.token}` } }
		);

		return {
			body,
			statusCode
		};
	}

	async findById(id: number, throwHttpErrors = true) {
		const { body, statusCode } = await req.get<IPost>(
			{ url: `post/${id}` },
			{ throwHttpErrors, headers: { Authorization: `Bearer ${this.params.token}` } }
		);

		return {
			body,
			statusCode
		};
	}

	async getAllPosts(userId: string) {
		const { body, statusCode } = await req.delete<Partial<IPost[]>>(
			{ url: `post/${userId}` },
			{ headers: { Authorization: `Bearer ${this.params.token}` } }
		);

		return {
			body,
			statusCode
		};
	}
}
