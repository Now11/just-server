import { createConnection } from 'typeorm';
import { dbConfig } from './config';

const dbConnect = async () => {
	try {
		const connection = await createConnection(dbConfig.connectionOpts);
		return connection;
	} catch (err) {
		// eslint-disable-next-line no-console
		console.log(`Connection with error: ${err}`);
		throw err;
	}
};

export { dbConnect };
