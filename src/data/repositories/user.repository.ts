import { EntityRepository } from 'typeorm';
import { User } from '../entities/User';
import BaseRepository from './base.repository';

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {
	getByEmail(email: string): Promise<User | undefined> {
		return this.findOne({ where: { email } });
	}
}
