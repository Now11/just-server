import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { env } from './env';
import { createConnection } from 'typeorm';
import routes from './api/routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/', (req, res, next) =>
  req.path === '/' ? res.sendStatus(200) : next()
); // health check
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);
const { port } = env.app;
app.listen(port, async () => {
  try {
    await createConnection();
    console.log(`Server is running at ${port}.`);
  } catch (error) {
    console.log('App started with error:', error);
  }
});

export default app;
