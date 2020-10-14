import { getCustomRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import UserRepository from '../repositories/userRepository';

export class UserController {
	async getUser(req: Request, res: Response): Promise<void> {
		const repository = getCustomRepository(UserRepository);
		const { id } = req.params;
		try {
			const user = await repository.getById(id);
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
		const repository = getCustomRepository(UserRepository);
		try {
			const user = await repository.createUser(body);
			res.status(201).send(user);
		} catch (error) {
			next(error);
		}
	}
}
