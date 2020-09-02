import { Express } from 'express';
import userRoute from './userRoutes';

const routes = (app: Express) => {
  app.use('/api/users', userRoute);
};
export default routes;
