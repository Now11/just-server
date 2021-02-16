import passport from 'passport';

const registrationMiddleware = passport.authenticate('register', { session: false });

export { registrationMiddleware };
