import { env } from './env';
import { getConnecion } from './db';
import app from './app';

const { port } = env.app;

getConnecion().then(() => {
	app.listen(port, () => {
		console.log(`Server is running at ${port}`);
	});
});
