import { EntityRepository } from 'typeorm';
import { Post } from '../entities/Post';
import BaseRepository from './base.repository';

@EntityRepository(Post)
export class PostRepository extends BaseRepository<Post> {
	async findAllByOwnerId(id: string) {
		return this.find({ where: { ownerId: id } });
	}
}
