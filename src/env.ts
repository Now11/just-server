import * as dotenv from 'dotenv';

dotenv.config();

export const env = {
  app: {
    port: process.env.PORT,
    secret: process.env.SECRET_KEY,
    client: process.env.APP_CLIENT_URL,
  },
};
