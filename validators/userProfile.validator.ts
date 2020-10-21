import { validate } from 'class-validator';
import { IVerifyOptions } from 'passport-local';
import { authErrorMessages, EMAIL_FIELD, PASSWORD, FIRST_NAME, LAST_NAME } from '../src/constants/auth.helper';
import { User } from '../src/entity/User';
import { CustomError } from '../src/helpers/errorHandler.helper';
import HttpStatusCode from '../src/constants/httpStatusCode.helper';

interface ValidateUser {
	(data: Partial<User>, next: (error: any, user?: any, options?: IVerifyOptions | undefined) => void): Promise<
		boolean
	>;
}

// eslint-disable-next-line consistent-return
export const validateUser: ValidateUser = async (data, next) => {
	const userInstance = new User(data);

	const errorsArray = await validate(userInstance);
	const errors = errorsArray.length > 0;
	if (errors) {
		errorsArray.forEach((error) => {
			switch (error.property) {
				case EMAIL_FIELD:
					return next(
						new CustomError(HttpStatusCode.UNPROCESSABLE_ENTITY, authErrorMessages.INVALID_EMAIL),
						null,
					);
				case PASSWORD:
					return next(
						new CustomError(HttpStatusCode.UNPROCESSABLE_ENTITY, authErrorMessages.INVALID_PASSWORD),
						null,
					);
				case FIRST_NAME:
					return next(
						new CustomError(HttpStatusCode.UNPROCESSABLE_ENTITY, authErrorMessages.INVALID_FIRST_NAME),
						null,
					);
				case LAST_NAME:
					return next(
						new CustomError(HttpStatusCode.UNPROCESSABLE_ENTITY, authErrorMessages.INVALID_LAST_NAME),
						null,
					);
				default:
					return next(
						new CustomError(HttpStatusCode.UNPROCESSABLE_ENTITY, authErrorMessages.UPROCESSABLE_DATA),
						null,
					);
			}
		});
	}

	return !errors;
};
