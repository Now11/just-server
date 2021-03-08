import { createConnection } from 'typeorm';
import UserSeeder from './user.seeder';
import TagSeeder from './tags.seeder';

createConnection()
	.then(async () => {
		await UserSeeder.execute();
		await TagSeeder.execute();
	})
	.catch(e => {
		// eslint-disable-next-line no-console
		console.error(e);
	});
