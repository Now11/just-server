import { CookieJar } from 'tough-cookie';

export interface IAuthParams {
	token?: string;
	cookies?: CookieJar;
}
