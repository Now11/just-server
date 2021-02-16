import { env } from '../env';

const { secret } = env.app;

const ACCESS_TOKEN_EXPIRATION_TIME = '24h';

export const jwtConfig = {
	secret,
	accessToken: {
		expiresIn: ACCESS_TOKEN_EXPIRATION_TIME
	}
};
