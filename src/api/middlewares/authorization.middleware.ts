import { Request, Response, NextFunction } from 'express';
import { jwtMiddleware } from './jwt.middleware';

const urlInWhiteList = (url: string, routesWhiteList: string[]) => {
	const isAllowed = routesWhiteList.some(route => route === url);
	return isAllowed;
};

export const authorizationMiddleware = (routesWhiteList: string[] = []) => (
	req: Request,
	res: Response,
	next: NextFunction
) => (urlInWhiteList(req.path, routesWhiteList) ? next() : jwtMiddleware(req, res, next));
