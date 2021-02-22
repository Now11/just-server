/* eslint-disable */
import { IUser } from '../src/common/models';
declare global {
	namespace Express {
		interface User extends IUser {}
		interface Request {
			user?: IUser;
		}
	}
}
