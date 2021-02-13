import passport from '../../config/passport.config';

const loginMiddleware = passport.authenticate('login', { session: false });

export { loginMiddleware };
