const {Strategy: jwtStratigy, ExtractJwt} = require('passport-jwt');

const User = require('../models/User');
// secret key
const {secretOrKey} = require('./keys');
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretOrKey;
// :fun that takes passport as a param and
module.exports = passport => {
    passport.use(new jwtStratigy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => user ? done(null, user) : done(null, false))
            .catch(err => console.log(err))
    }))
}