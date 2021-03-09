import req from '../httpRequest';
import { BaseController } from './base.controller';
import { ILoginReposen, ILoginRequest, IRegisterRequest, IRegisterResponse } from '../common/models';

export class UserController extends BaseController {
	async login({ email, password }: ILoginRequest, throwError?: boolean) {
		const { body, statusCode } = await req.post<ILoginReposen>(
			{
				url: 'auth/login',
				body: { email, password }
			},
			{ throwHttpErrors: throwError }
		);

		return { body, statusCode };
	}

	async register(data: IRegisterRequest) {
		const { body, statusCode } = await req.post<IRegisterResponse>({
			url: 'auth/register',
			body: data
		});

		return { body, statusCode };
	}
}
