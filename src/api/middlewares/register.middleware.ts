import passport from '../../config/passport.config';

const registrationMiddleware = passport.authenticate('register', { session: false });

export { registrationMiddleware };
