import { IUser } from './IUser';

export interface ILoginRequest {
	email: string;
	password: string;
}

export interface ILoginReposen {
	user: IUser;
	accessToken: string;
}
