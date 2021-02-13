import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import routes from './api/routes';
import { jwtConfig } from './config';
import { errorHandlerMiddleware, authenticateJwt } from './api/middlewares';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());

app.use('/api', authenticateJwt(jwtConfig.routesWhiteList), routes);

app.use(errorHandlerMiddleware);
app.use('/', (req, res, next) => (req.path === '/' ? res.sendStatus(200) : next())); // health check

export default app;
