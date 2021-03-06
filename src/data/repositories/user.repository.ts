import { EntityRepository } from 'typeorm';
import { User } from '../entities/User';
import BaseRepository from './base.repository';

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {
	getByEmail(email: string) {
		return this.findOne({ where: { email } });
	}

	async updateById(id: string, data: Partial<User>): Promise<User> {
		return this.createQueryBuilder()
			.update(User)
			.set(data)
			.where('id = :id', { id })
			.returning('*')
			.execute()
			.then(res => {
				return res.raw[0];
			});
	}
}
