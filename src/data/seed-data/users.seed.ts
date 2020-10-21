import { hashPassword } from '../../helpers/password.helper';

export const users = [
	{
		firstName: 'Elizabeth',
		lastName: 'Anderson',
		email: 'admin1@gmail.com',
		password: hashPassword('test11'),
	},
	{
		firstName: 'Megan',
		lastName: 'Armstrong',
		email: 'admin2@gmail.com',
		password: hashPassword('test12'),
	},
	{
		firstName: 'Harry',
		lastName: 'Potter',
		email: 'admin3@gmail.com',
		password: hashPassword('test13'),
	},
	{
		firstName: 'Oscar',
		lastName: 'Cooper',
		email: 'admin4@gmail.com',
		password: hashPassword('test14'),
	},
];
