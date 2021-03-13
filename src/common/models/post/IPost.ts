import { IUser } from '../user';
import { ITag } from '../tag';

export interface IPost {
	title: string;
	description: string;
	isPrivate: boolean;
	createdAt: Date;
	updatedAt: Date;
	owner: IUser;
	id: number;
	tags: ITag[];
}
