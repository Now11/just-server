import { env } from './env';
import { dbConnect } from './db';
import app from './app';

const { port } = env.app;

dbConnect().then(() => {
	app.listen(port, () => {
		// eslint-disable-next-line no-console
		console.log(`Server is running at ${port}`);
	});
});
