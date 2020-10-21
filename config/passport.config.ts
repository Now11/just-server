import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { getCustomRepository } from 'typeorm';
import { validateUser } from '../validators/userProfile.validator';
import { authErrorMessages, EMAIL_FIELD } from '../src/constants/auth.helper';
import { passwordValid, hashPassword } from '../src/helpers/password.helper';
import { jwtSecret } from './jwt.config';
import { UserRepository } from '../src/repositories';
import { UserModel } from '../src/models/user.model';
import { CustomError } from '../src/helpers/errorHandler.helper';
import { HttpStatusCode } from '../src/constants/httpStatusCode.helper';

passport.use(
	'local',
	new LocalStrategy(
		{
			usernameField: EMAIL_FIELD,
		},
		async (email: string, password: string, next): Promise<void> => {
			const userRepository = getCustomRepository(UserRepository);
			const user = await userRepository.getByEmail(email);

			if (!user) {
				return next(
					new CustomError(HttpStatusCode.UNAUTHORIZED, authErrorMessages.INCORRECT_CREDENTIALS),
					null,
				);
			}

			if (user.password && !passwordValid(password, user.password)) {
				return next(
					new CustomError(HttpStatusCode.UNAUTHORIZED, authErrorMessages.INCORRECT_CREDENTIALS),
					null,
				);
			}

			return next(null, user);
		},
	),
);

passport.use(
	'register',
	new LocalStrategy(
		{
			usernameField: EMAIL_FIELD,
			passReqToCallback: true,
		},
		// eslint-disable-next-line consistent-return
		async (req, email: string, password: string, next): Promise<void> => {
			const userRepository = getCustomRepository(UserRepository);
			const checkUser = await userRepository.getByEmail(email);

			if (checkUser) {
				return next(new CustomError(HttpStatusCode.UNAUTHORIZED, authErrorMessages.TAKEN_EMAIL), null);
			}

			const { firstName, lastName } = req.body;
			const isValidEntity = await validateUser({ email, password, firstName, lastName }, next);

			if (isValidEntity) {
				const encodedPassword = hashPassword(password);

				const newUserObject = await userRepository.createNew({
					...req.body,
					email,
					password: encodedPassword,
				});
				return next(null, newUserObject);
			}
		},
	),
);

passport.use(
	'jwt',
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: jwtSecret,
		},
		async ({ id }: { id: string }, next): Promise<void> => {
			try {
				const userRepository = getCustomRepository(UserRepository);
				const user = await userRepository.getById(id);

				return next(null, user);
			} catch (error) {
				return next(new CustomError(HttpStatusCode.UNAUTHORIZED, authErrorMessages.NO_USER), null);
			}
		},
	),
);

passport.serializeUser((user: UserModel, next) => {
	next(null, { id: user.id });
});

passport.deserializeUser(async (id: string, next) => {
	const userRepository = getCustomRepository(UserRepository);
	const user = await userRepository.getById(id);
	next(null, user);
});

export default passport;
