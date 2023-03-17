const LocalStrategy = require("passport-local");
const usersService = require("../users/users.service");
const passport = require("passport");

passport.use(
  "local",
  new LocalStrategy(async function verify(username, password, cb) {
    try {
      const user = await usersService.findOneForAuth(username);
      const passwordValid = await user.isValidPassword(password);
      if (!passwordValid) {
        return cb(null, false, { message: "Incorrect username or password." });
      }
      return cb(null, user);
    } catch (e) {
      if (e.name === "NotFoundError") {
        return cb(null, false, { message: "Incorrect username or password." });
      }
      return cb(null, false);
    }
  })
);
