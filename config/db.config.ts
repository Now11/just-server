import 'dotenv/config';
import { Connection, createConnection } from 'typeorm';

export const createPostgreSQLConnection = async (): Promise<Connection> => {
	const connection = await createConnection({
		type: process.env.TYPEORM_CONNECTION as any,
		host: process.env.TYPEORM_HOST,
		port: process.env.TYPEORM_PORT as any,
		username: process.env.TYPEORM_USERNAME,
		password: process.env.TYPEORM_PASSWORD,
		database: process.env.TYPEORM_DATABASE,
		logging: Boolean(process.env.TYPEORM_LOGGING),
		entities: [process.env.TYPEORM_ENTITIES],
		migrations: [process.env.TYPEORM_MIGRATIONS],
	});

	return connection;
};
