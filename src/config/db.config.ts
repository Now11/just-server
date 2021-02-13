import { ConnectionOptions } from 'typeorm';
import { env } from '../env';

const { db } = env;

const connectionOpts: ConnectionOptions = {
	database: db.database,
	type: db.type as 'postgres',
	port: db.port,
	username: db.username,
	password: db.password,
	host: db.host,
	entities: db.entities,
	migrations: db.migrations,
	synchronize: db.synchronize,
};

export { connectionOpts };
