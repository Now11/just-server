import { createConnection } from 'typeorm';
import { connectionOpts } from './config';

const getConnection = async () => {
	try {
		const connection = await createConnection(connectionOpts);
		return connection;
	} catch (err) {
		// eslint-disable-next-line no-console
		console.log(`Connection with error: ${err}`);
		throw err;
	}
};

export { getConnection };
