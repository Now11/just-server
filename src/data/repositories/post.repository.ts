import { EntityRepository } from 'typeorm';
import { Post } from '../entities/Post';
import BaseRepository from './base.repository';

@EntityRepository(Post)
export class PostRepository extends BaseRepository<Post> {
	async findAllByOwnerId(id: string) {
		return this.find({ where: { ownerId: id } });
	}

	async findById(id: string): Promise<Post> {
		return this.createQueryBuilder('post')
			.where('post.id = :id', { id })
			.leftJoin('post.owner', 'user')
			.addSelect(['user.email', 'user.firstName', 'user.lastName', 'user.id'])
			.getOne();
	}

	async updateById(id: string, data: Partial<Post>): Promise<Post> {
		return this.createQueryBuilder()
			.update(Post)
			.set(data)
			.where('id = :id', { id })
			.returning('*')
			.execute()
			.then(res => {
				return res.raw[0];
			});
	}
}
