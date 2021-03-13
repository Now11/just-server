export interface ITag {
	title: string;
	id: number;
}

interface IUser {
	id: string;
}

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

export interface INewPost {
	title: string;
	description: string;
	isPrivate?: boolean;
	tags?: ITag[];
}

export interface IUpdatePost {
	title?: string;
	description?: string;
	isPrivate?: boolean;
	tags?: ITag[];
}
