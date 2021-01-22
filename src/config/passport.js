import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import BearerStrategy from 'passport-http-bearer';
import vars from './vars';
import authProviders from '../api/services/authProviders';
import User from '../api/models/user';

const jwtOptions = {
  secretOrKey: vars.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

const jwtAuth = async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};

const oAuth = (service) => async (token, done) => {
  try {
    const userData = await authProviders[service](token);
    const user = await User.oAuthLogin(userData);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

export const jwt = new JwtStrategy(jwtOptions, jwtAuth);
export const facebook = new BearerStrategy(oAuth('facebook'));
export const google = new BearerStrategy(oAuth('google'));
