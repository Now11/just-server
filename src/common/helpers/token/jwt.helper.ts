import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../../config';

const { secret } = jwtConfig;

export const generateAccessToken = (id: string): string => jwt.sign({ id }, secret, { expiresIn: '10000ms' });
