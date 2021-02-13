import { EntityRepository } from 'typeorm';
import { Post } from '../entities/Post';
import BaseRepository from './base.repository';

@EntityRepository(Post)
export class PostRepository extends BaseRepository<Post> {
	async findAllByUserId(id: string) {
		return this.find({ where: { owner: id } });
		// return this.createQueryBuilder('Post').where('Post.ownerId = :id', { id }).getMany();
	}
}
