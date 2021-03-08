import { EntityRepository } from 'typeorm';
import { Tag } from '../entities/Tag';
import BaseRepository from './base.repository';

@EntityRepository(Tag)
export class TagRepository extends BaseRepository<Tag> {}
