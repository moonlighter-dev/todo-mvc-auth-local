const LocalStrategy = require('passport-local').Strategy
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/User')

module.exports = function (passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      const errorMessage = 'Invalid credentials'
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, { msg: errorMessage })
      }
      if (!user.password) {
        return done(null, false, { msg: errorMessage })
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) { return done(err) }
        if (isMatch) {
          return done(null, user)
        }
        return done(null, false, { msg: errorMessage })
      })
    })
  }))

  passport.use(
    new JWTstrategy(
      {
        secretOrKey: 'TOP_SECRET',
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
        // adjust according to client request params
        // consider using:
        // fromAuthHeaderAsBearerToken(), fromAuthHeaderWithScheme('JWT')
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(null, false, { msg: 'Invalid token' });
        }
      }
    )
  );

}
