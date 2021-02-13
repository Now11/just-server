import { Request, Response } from 'express';
import { generateToken } from '../common/helpers';

class AuthService {
	login(req: Request, res: Response) {
		const { id, createdAt, updatedAt, password, ...data }: any = req.user;
		const accessToken = generateToken(id);
		res.send({ id, ...data, accessToken });
	}
}

export { AuthService };
