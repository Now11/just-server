import { EntityRepository } from 'typeorm';
import { CustomError } from '../../common/helpers';
import { Post } from '../entities/Post';
import BaseRepository from './base.repository';

@EntityRepository(Post)
export class PostRepository extends BaseRepository<Post> {
	async findAllByOwnerId(id: string) {
		return this.createQueryBuilder('post')
			.select(['post.id', 'post.title', 'post.description', 'tags.id', 'tags.title'])
			.leftJoin('post.tags', 'tags')
			.where({ owner: id })
			.getMany();
	}

	async findById(id: number) {
		return this.createQueryBuilder()
			.select(['post', 'owner.id', 'tags.id', 'tags.title'])
			.from(Post, 'post')
			.leftJoin('post.owner', 'owner')
			.leftJoin('post.tags', 'tags')
			.where({ id })
			.getOne();
	}

	async updateById(data: Partial<Post>): Promise<Post> {
		const post = await this.save(data).catch(err => {
			throw new CustomError(500, 'Internal Server Error');
		});

		return this.findById(post.id);
	}
}
