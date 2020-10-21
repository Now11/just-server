import { Request, Response } from 'express';
import { generateToken } from '../helpers/jwt.helper';

class AuthController {
	login(req: Request, res: Response) {
		const { id, createdAt, updatedAt, password, ...data }: any = req.user;
		const accessToken = generateToken(id);
		res.send({ data, accessToken });
	}
}

export default AuthController;
