const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

module.exports = function (passport) {
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
