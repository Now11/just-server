import { env } from './env';
import { getConnection } from './db';
import app from './app';

const { port } = env.app;

getConnection().then(() => {
	app.listen(port, () => {
		// eslint-disable-next-line no-console
		console.log(`Server is running at ${port}`);
	});
});
