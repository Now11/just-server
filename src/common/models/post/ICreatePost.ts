import { ITag } from '../tag';

export interface ICreatePost {
	title: string;
	description: string;
	isPrivate: boolean;
	tags: ITag[];
}
