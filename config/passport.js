const mongoose = require('mongoose');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const secret = require('./index').secret;
const opts = {};

const User = mongoose.model('User');

module.exports = passport => {
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = secret;
    passport.use(
        new JwtStrategy(opts, function(jwt_payload, done) {
            User.findOne({ _id: jwt_payload._id }, function(err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                    // or you could create a new account
                }
            });
        })
    );
};
