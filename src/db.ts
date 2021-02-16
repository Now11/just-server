import { createConnection } from 'typeorm';
import { connectionOpts } from './config';

const getConnection = async () => {
	try {
		await createConnection(connectionOpts);
		// eslint-disable-next-line no-console
		console.log('Successfully connected to Postges DB');
	} catch (err) {
		// eslint-disable-next-line no-console
		console.log(`Connection with error: ${err}`);
		throw err;
	}
};

export { getConnection };
