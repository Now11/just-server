import passport from 'passport';

const loginMiddleware = passport.authenticate('login', { session: false });

export { loginMiddleware };
