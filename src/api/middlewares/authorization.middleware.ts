import { Request, Response, NextFunction } from 'express';
import { jwtMiddleware } from './jwt.middleware';

const urlInWhiteList = (url: string, routesWhiteList: string[]) => {
	const isALlowed = routesWhiteList.some(route => route === url);
	return isALlowed;
};

export const authorizationMiddleware = (routesWhiteList: string[] = []) => (
	req: Request,
	res: Response,
	next: NextFunction
) => (urlInWhiteList(req.path, routesWhiteList) ? next() : jwtMiddleware(req, res, next));
