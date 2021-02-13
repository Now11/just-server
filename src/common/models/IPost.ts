export interface IPost {
	id: string;
	title: string;
	description: string;
	isPrivate: boolean;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
}
