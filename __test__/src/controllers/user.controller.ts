import req from '../httpRequest';
import { BaseController } from './base.controller';
import { ILoginReposen, ILoginRequest, INewUser, IUser } from '../common/models';

export class UserController extends BaseController {
	async login({ email, password }: ILoginRequest, throwHttpErrors = true) {
		const { body, statusCode } = await req.post<ILoginReposen>(
			{
				url: 'auth/login',
				body: { email, password }
			},
			{ throwHttpErrors }
		);

		return { body, statusCode };
	}

	async register(data: INewUser) {
		const { body, statusCode } = await req.post<IUser>({
			url: 'auth/register',
			body: data
		});

		return { body, statusCode };
	}
}
