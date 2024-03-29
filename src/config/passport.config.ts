import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { getCustomRepository } from 'typeorm';
import { validateUser } from '../validators/userProfile.validation';
import { UserKeys, HttpStatusCode } from '../common/enums';
import { authErrorMessages } from '../common/constants';
import { passwordValid, CustomError } from '../common/helpers';
import { UserRepository } from '../data/repositories';
import { jwtOptions } from './jwtConfig';

passport.use(
	'login',
	new LocalStrategy(
		{
			usernameField: UserKeys.EMAIL_FIELD
		},
		// eslint-disable-next-line consistent-return
		async (email: string, password: string, next): Promise<void> => {
			try {
				const userRepository = getCustomRepository(UserRepository);
				const user = await userRepository.getByEmail(email);
				if (!user) {
					return next(
						new CustomError(HttpStatusCode.BAD_REQUEST, authErrorMessages.INCORRECT_CREDENTIALS),
						null
					);
				}

				if (user.password && !passwordValid(password, user.password)) {
					return next(
						new CustomError(HttpStatusCode.BAD_REQUEST, authErrorMessages.INCORRECT_CREDENTIALS),
						null
					);
				}

				return next(null, user);
			} catch (error) {
				return next(error);
			}
		}
	)
);

passport.use(
	'register',
	new LocalStrategy(
		{
			usernameField: UserKeys.EMAIL_FIELD,
			passReqToCallback: true
		},
		// eslint-disable-next-line consistent-return
		async ({ body: { firstName, lastName } }, email, password, next): Promise<void> => {
			try {
				const userRepository = getCustomRepository(UserRepository);
				const user = await userRepository.getByEmail(email);

				if (user) {
					return next(new CustomError(HttpStatusCode.BAD_REQUEST, authErrorMessages.TAKEN_EMAIL), null);
				}

				const isValidEntity = await validateUser({ email, password, firstName, lastName }, next);
				if (isValidEntity) {
					return next(null, { email, firstName, lastName, password });
				}
			} catch (error) {
				return next(error);
			}
		}
	)
);

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: jwtOptions.secret
};

passport.use(
	'jwt',
	new JwtStrategy(
		opts,
		async ({ id }: { id: string }, next): Promise<void> => {
			try {
				const userRepository = getCustomRepository(UserRepository);
				const user = await userRepository.getById(id);
				return user
					? next(null, user)
					: next(new CustomError(HttpStatusCode.UNAUTHORIZED, authErrorMessages.INVALID_TOKEN), null);
			} catch (error) {
				return next(error);
			}
		}
	)
);

export default passport;
