import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import routes from './src/routes';
import { APP_PORT } from './config/app.config';
import { createPostgreSQLConnection } from './config/db.config';
import { routesWhiteList } from './config/jwt.config';
import { authenticateJwt } from './src/middleware/jwt.middleware';
import errorHandlerMiddleware from './src/middleware/errorHandler.middleare';

const app = express();

app.use(
	cors({
		origin: '*',
		allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'Authorization', 'Access-Control-Allow-Origin'],
	}),
);
app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/api', authenticateJwt(routesWhiteList), routes);

app.use(errorHandlerMiddleware);
app.use('/', (req, res, next) => (req.path === '/' ? res.sendStatus(200) : next())); // health check

const bootstrapApp = async () => {
	await createPostgreSQLConnection().then(
		() => {
			// eslint-disable-next-line no-console
			console.log('Connected to DB');
		},
		(error) => {
			// eslint-disable-next-line no-console
			console.log(`Connected with error: ${error}`);
		},
	);

	app.listen(APP_PORT, async () => {
		try {
			// eslint-disable-next-line no-console
			console.log(`Server is running at ${APP_PORT}.`);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(`App started with error:${error}`);
		}
	});
};

bootstrapApp();
