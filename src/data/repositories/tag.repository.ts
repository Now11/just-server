import { EntityRepository } from 'typeorm';
import { Tag } from '../entities/Tag';
import BaseRepository from './base.repository';

@EntityRepository(Tag)
export class TagRepository extends BaseRepository<Tag> {
	async findByTitle(title: string) {
		return this.findOne({ where: { title } });
	}

	async findAll() {
		return this.createQueryBuilder('tag').select(['tag.id', 'tag.title']).getMany();
	}
}
