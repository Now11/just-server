import { Request, Response, NextFunction } from 'express';
import { CustomError, handleError } from '../../common/helpers';

const errorHandlerMiddleware = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
	handleError(err, res);
};

export { errorHandlerMiddleware };
