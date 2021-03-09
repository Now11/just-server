import { EntityRepository } from 'typeorm';
import { Post } from '../entities/Post';
import BaseRepository from './base.repository';

@EntityRepository(Post)
export class PostRepository extends BaseRepository<Post> {
	// TO DO: refactor to Get Post in form {[postId:1, postTitle:'tttt']}
	async findAllByOwnerId(id: string) {
		return this.createQueryBuilder('post').select(['post.id', 'post.title']).where({ owner: id }).getMany();
	}

	async findById(id: number) {
		return this.createQueryBuilder()
			.select(['post', 'owner.id', 'tags.id', 'tags.title'])
			.from(Post, 'post')
			.innerJoin('post.owner', 'owner')
			.innerJoin('post.tags', 'tags')
			.where({ id })
			.getOne();
	}

	async updateById(id: number, data: Partial<Post>): Promise<Post> {
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
