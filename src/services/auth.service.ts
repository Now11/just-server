import { getCustomRepository } from 'typeorm';
import { generateToken, hashPassword } from '../common/helpers';
import { ICreateUser } from '../common/models';
import { IUser } from '../common/models/user/IUser';

import { UserRepository } from '../data/repositories';

class AuthService {
	async login(data: IUser) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, createdAt, updatedAt, id, ...user } = data;
		const accessToken = generateToken(id);
		return { accessToken, user };
	}

	async register(data: ICreateUser) {
		const { password, ...user } = data;
		const userRepository = getCustomRepository(UserRepository);

		await userRepository.createItem({
			...user,
			password: hashPassword(password)
		});

		return { user };
	}
}

export { AuthService };
