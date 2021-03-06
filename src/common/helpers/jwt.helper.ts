import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../config';

const { secret, accessToken } = jwtConfig.jwtOptions;

export const generateAccessToken = (id: string): string =>
	jwt.sign({ id }, secret, { expiresIn: accessToken.expiresIn });
