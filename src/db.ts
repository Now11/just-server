import { createConnection } from 'typeorm';
import { connectionOpts } from './config/db.config';

const getConnecion = async () => {
	try {
		await createConnection({ ...connectionOpts });
		console.log('Successfully connected to Postges DB');
	} catch (err) {
		console.log(`Connection with error: ${err}`);
		throw err;
	}
};

export { getConnecion };
