import { validate } from 'class-validator';
import { IVerifyOptions } from 'passport-local';
import { authErrorMessages } from '../common/constants';
import { UserKeys, HttpStatusCode } from '../common/enums';
import { User } from '../data/entities/User';
import { CustomError } from '../common/helpers';

interface ValidateUser {
	(data: Partial<User>, next: (error: any, user?: any, options?: IVerifyOptions | undefined) => void): Promise<
		boolean
	>;
}

export const validateUser: ValidateUser = async (data, next) => {
	const userInstance = Object.assign(new User(), data);
	const errorsArray = await validate(userInstance);
	const errors = errorsArray.length > 0;
	if (errors) {
		errorsArray.forEach(error => {
			switch (error.property) {
				case UserKeys.EMAIL_FIELD:
					return next(
						new CustomError(HttpStatusCode.UNPROCESSABLE_ENTITY, authErrorMessages.INVALID_EMAIL),
						null
					);
				case UserKeys.PASSWORD:
					return next(
						new CustomError(HttpStatusCode.UNPROCESSABLE_ENTITY, authErrorMessages.INVALID_PASSWORD),
						null
					);
				case UserKeys.FIRST_NAME:
					return next(
						new CustomError(HttpStatusCode.UNPROCESSABLE_ENTITY, authErrorMessages.INVALID_FIRST_NAME),
						null
					);
				case UserKeys.LAST_NAME:
					return next(
						new CustomError(HttpStatusCode.UNPROCESSABLE_ENTITY, authErrorMessages.INVALID_LAST_NAME),
						null
					);
				default:
					return next(
						new CustomError(HttpStatusCode.UNPROCESSABLE_ENTITY, authErrorMessages.UPROCESSABLE_DATA),
						null
					);
			}
		});
	}

	return !errors;
};
