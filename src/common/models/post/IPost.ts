import { IUser } from '../user';

export interface IPost {
	title: string;
	description: string;
	isPrivate: boolean;
	createdAt: Date;
	updatedAt: Date;
	owner: IUser;
	id: number;
}
