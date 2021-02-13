import { hashPassword } from '../../common/helpers';

export const users = [
	{
		firstName: 'Elizabeth',
		lastName: 'Anderson',
		email: 'admin1@gmail.com',
		password: hashPassword('111111'),
		posts: [] as unknown[],
	},
	{
		firstName: 'Megan',
		lastName: 'Armstrong',
		email: 'admin2@gmail.com',
		password: hashPassword('111111'),
		posts: [] as unknown[],
	},
	{
		firstName: 'Harry',
		lastName: 'Potter',
		email: 'admin3@gmail.com',
		password: hashPassword('111111'),
		posts: [] as unknown[],
	},
	{
		firstName: 'Oscar',
		lastName: 'Cooper',
		email: 'admin4@gmail.com',
		password: hashPassword('111111'),
		posts: [] as unknown[],
	},
];
