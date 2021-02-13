import passport from '../../config/passport.config';

const loginMiddleware = passport.authenticate('local', { session: false });

export { loginMiddleware };
