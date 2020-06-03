const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

const Usercomics = require('../models/Usercomics');

passport.use(new JwtStrategy({
    secretOrKey : 'top_secret', // modifier par une chaine de caractère aléatoire
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
}, (jwt_payload, done) => {
    return done(null, jwt_payload.usercomics);
}));

// passport.use('signup', new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
//   }, (email, password, done) => {
//     console.log(email);
//     Usercomics.create({ email, password }, (err, usercomics) => done(err, usercomics));
//   }));
  
  passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => {
    Usercomics.findOne({ email }, (err, usercomics) => {
      if(!usercomics){
        return done(null, false, { message : 'User not found'});
      }
      usercomics.isValidPassword(password, isValid => {
        if(!isValid){
          return done(null, false, { message : 'Wrong Password'});
        }
        return done(null, usercomics, { message : 'Logged in Successfully'});
      });
    });
  }));