import { getCustomRepository } from 'typeorm';
import { generateAccessToken, hashPassword } from '../common/helpers';
import { IRegisterUser, IUser } from '../common/models';
import { UserRepository } from '../data/repositories';

class AuthController {
	async login(data: IUser) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, createdAt, updatedAt, id, ...user } = data;
		const accessToken = generateAccessToken(id);
		return { accessToken, user: { ...user, id } };
	}

	async register(data: IRegisterUser) {
		const { password, ...user } = data;
		const userRepository = getCustomRepository(UserRepository);

		const newUser = await userRepository.createItem({
			...user,
			password: hashPassword(password)
		});

		return {
			id: newUser.id,
			email: newUser.email,
			firstName: newUser.firstName,
			lastName: newUser.lastName
		};
	}
}

export { AuthController };
