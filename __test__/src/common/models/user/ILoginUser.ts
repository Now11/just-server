import { IRegisterResponse } from './IRegisterUser';

export interface ILoginRequest {
	email: string;
	password: string;
}

export interface ILoginReposen {
	user: IRegisterResponse;
	accessToken: string;
}
