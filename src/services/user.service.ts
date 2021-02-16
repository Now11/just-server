import { getCustomRepository } from 'typeorm';

import { UserRepository } from '../data/repositories/user.repository';

class UserService {
	async getUserById(id: string) {
		const userRepository = getCustomRepository(UserRepository);
		return userRepository.getById(id);
	}
}
export { UserService };
