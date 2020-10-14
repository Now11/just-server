import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import routes from './src/routes';
import { APP_PORT } from './config/app.config';

createConnection()
	.then(async () => {
		const app = express();

		app.use(cors());
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: true }));
		app.use('/api', routes);
		app.use('/', (req, res, next) => (req.path === '/' ? res.sendStatus(200) : next())); // health check

		app.listen(APP_PORT, async () => {
			try {
				// eslint-disable-next-line no-console
				console.log(`Server is running at ${APP_PORT}.`);
			} catch (error) {
				// eslint-disable-next-line no-console
				console.log('App started with error:', error);
			}
		});
	})
	.catch((err) => console.log(err));
