import { createConnection } from 'typeorm';
import UserSeeder from './user.seeder';

createConnection()
	.then(async () => {
		await UserSeeder.execute();
	})
	.catch((e) => {
		// eslint-disable-next-line no-console
		console.error(e);
	});
