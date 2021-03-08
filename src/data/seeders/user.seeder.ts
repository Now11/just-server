import { getRepository } from 'typeorm';
import { users } from '../seed-data';
import { User } from '../entities/User';

export default class UserSeeder {
	public static async execute() {
		const userRepository = getRepository(User);
		users.forEach(async user => {
			await userRepository.save(user);
		});
	}
}
