import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/User';
import { UserModel } from '../models/user.model';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	async createNew(data: UserModel): Promise<User> {
		const user = await this.create(data).save();
		return user;
	}

	async getById(id: string): Promise<UserModel> {
		const user = await this.findOne({ where: { id } });
		if (!user) {
			throw new Error('User not found');
		}
		return user;
	}

	async getByEmail(email: string): Promise<User | undefined> {
		return this.findOne({ where: { email } });
	}
}
