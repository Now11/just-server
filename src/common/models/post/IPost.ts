export interface IPost {
	title: string;
	description: string;
	isPrivate: boolean;
	createdAt: Date;
	updatedAt: Date;
	owner: string;
	id: number;
}
