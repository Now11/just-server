import jwt from 'jsonwebtoken';

const verifyToken = (token: string, secret: string) => {
	const payload = jwt.verify(token, secret);
	return payload;
};
export { verifyToken };
