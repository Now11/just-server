import * as dotenv from 'dotenv';
import { getEnv } from './common/helpers/path.helper';

dotenv.config();

export const env = {
	app: {
		nodeEnv: getEnv('NODE_ENV'),
		port: getEnv('APP_PORT') || 3001,
		secret: getEnv('SECRET') || 'secret'
	},

	db: {
		database: getEnv('TYPEORM_DATABASE'),
		type: getEnv('TYPEORM_CONNECTION'),
		username: getEnv('TYPEORM_USERNAME'),
		password: getEnv('TYPEORM_PASSWORD'),
		host: getEnv('TYPEORM_HOST'),
		port: Number(getEnv('TYPEORM_PORT')),
		entities: [getEnv('TYPEORM_ENTITIES')],
		migrations: [getEnv('TYPEORM_MIGRATIONS')],
		synchronize: Boolean(getEnv('TYPEORM_SYNCHRONIZE'))
	}
};
