export interface IUser extends Express.User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}
