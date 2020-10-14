import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/User';
import { IUser } from '../models/IUser';

@EntityRepository(User)
class UserRepository extends Repository<User> {
	async createUser(data: IUser): Promise<IUser> {
		const user = await this.create(data).save();
		return user;
	}

	async getById(id: string): Promise<IUser> {
		const user = await this.findOne(id);
		return user;
	}
}

export default UserRepository;
