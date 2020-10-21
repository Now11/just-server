import { getCustomRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repositories/user.repository';

export class UserController {
	async getUser(req: Request, res: Response): Promise<void> {
		const userRepository = getCustomRepository(UserRepository);
		const { id } = req.params;
		try {
			const user = await userRepository.getById(id);
			if (!user) {
				throw new Error('User was not found');
			}
			res.send(user);
		} catch (error) {
			res.status(404).send(error.message);
		}
	}

	async createUser(req: Request, res: Response, next: NextFunction) {
		const { body } = req;
		const userRepository = getCustomRepository(UserRepository);
		try {
			const user = await userRepository.createNew(body);
			res.status(201).send(user);
		} catch (error) {
			next(error);
		}
	}
}
