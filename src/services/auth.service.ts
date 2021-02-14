import { getCustomRepository } from 'typeorm';
import { generateToken, hashPassword } from '../common/helpers';
import { IAuthUser, ICreateUser } from '../common/models';
import { UserRepository } from '../data/repositories';

class AuthService {
	async login(data: IAuthUser) {
		const accessToken = generateToken(data.id);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, createdAt, updatedAt, ...user } = data;
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
