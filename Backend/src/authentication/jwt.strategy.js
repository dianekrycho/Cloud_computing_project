const { Strategy, ExtractJwt } = require("passport-jwt");
const usersService = require("../users/users.service");
const passport = require("passport");

passport.use(
  "jwt",
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // extract token from Authorization header as a Bearer token
      secretOrKey: process.env.JWT_SECRET, // jwt secret extracted from .env
    },
    async function (token, cb) {
      try {
        const user = await usersService.findOne(token.sub);
        return cb(null, user);
      } catch (e) {
        return cb(null, false);
      }
    }
  )
);
