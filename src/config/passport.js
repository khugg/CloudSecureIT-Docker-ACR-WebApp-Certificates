const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
    new Strategy(opts, (jwt_payload, done) => {
        if (jwt_payload) {
          return done(null, jwt_payload);
        } else {
          return done(null, false);
        }
      })
    );

module.exports = passport;
// Compare this snippet from src/config/passport.js:


