const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require("config");

const User = require("../models/User");

const secretOrKey = config.get("secretOrKey");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey
};

passport.initialize();

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    // console.log(jwt_payload);
    try {
      const serachRes = await User.findById(jwt_payload.id);
      serachRes ? done(null, serachRes) : done(null, false);
    } catch (err) {
      console.error(err);
    }
  })
);

module.exports = isAuth = () =>
  passport.authenticate("jwt", { session: false });
