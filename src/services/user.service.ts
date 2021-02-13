import { getCustomRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../data/repositories/user.repository';

class UserService {
	async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
		const userRepository = getCustomRepository(UserRepository);
		const { id } = req.params;
		try {
			const user = await userRepository.getById(id);

			if (!user) {
				res.status(404).send({ result: 'error', message: 'User was not found' });
			}

			res.send(user);
		} catch (error) {
			next(error);
		}
	}

	async getAllUsers(req: Request, res: Response): Promise<void> {
		const userRepository = getCustomRepository(UserRepository);
		try {
			const users = await userRepository.getAll();
			if (!users) {
				throw new Error('Users were not found');
			}
			res.send(users);
		} catch (error) {
			res.status(404).send(error.message);
		}
	}
}
export { UserService };
