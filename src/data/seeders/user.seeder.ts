import { users } from '../seed-data';
import { User } from '../entities/User';

export default class UserSeeder {
	public static async execute() {
		users.forEach(async (user) => {
			await Object.assign(new User(), user).save();
		});
	}
}
