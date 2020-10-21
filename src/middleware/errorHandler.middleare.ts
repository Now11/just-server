import { Request, Response, NextFunction } from 'express';
import { CustomError, handleError } from '../helpers/errorHandler.helper';

const errorHandlerMiddleware = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
	handleError(err, res);
};

export default errorHandlerMiddleware;
