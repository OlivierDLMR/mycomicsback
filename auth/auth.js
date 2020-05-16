const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const UsercomicsModel = require('../model/Usercomics');

passport.use(new JwtStrategy({
    secretOrKey : 'top_secret',
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
}, (jwt_payload, done) => {
    return done(null, jwt_payload.user);
}));

passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => {
    UsercomicsModel.create({ email, mdp }, (err, usercomics) => done(err, usercomics));
  }));
  
  passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, mdp, done) => {
    UsercomicsModel.findOne({ email }, (err, usercomics) => {
      if(!usercomics){
        return done(null, false, { message : 'User not found'});
      }
      usercomics.isValidPassword(mdp, isValid => {
        if(!isValid){
          return done(null, false, { message : 'Wrong Password'});
        }
        return done(null, user, { message : 'Logged in Successfully'});
      });
    });
  }));