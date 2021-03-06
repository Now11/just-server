import { getCustomRepository } from 'typeorm';
import { HttpStatusCode } from '../common/enums';
import { CustomError } from '../common/helpers';
import { IUser } from '../common/models';
import { UserRepository } from '../data/repositories';

class UserService {
	async getUserById(id: string) {
		const userRepository = getCustomRepository(UserRepository);
		const { password, createdAt, updatedAt, ...data } = await userRepository.getById(id);
		return data;
	}

	async updateUser(userId: string, userIdToUpdate: string, userData: IUser) {
		const userRepository = getCustomRepository(UserRepository);
		const user = await userRepository.getById(userIdToUpdate);

		if (!user) {
			throw new CustomError(HttpStatusCode.NOT_FOUND, 'User was not found');
		}

		if (user.id !== userId) {
			throw new CustomError(HttpStatusCode.FORBIDDEN, "You don't have permissions");
		}

		const { createdAt, updatedAt, id, ...data } = userData;
		const { password, ...updatedUser } = await userRepository.updateById(userIdToUpdate, data);

		return updatedUser;
	}
}
export { UserService };
