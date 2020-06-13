const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/Usercomics');

passport.use(new JwtStrategy({
    secretOrKey : 'top_secret', // modifier par une chaine de caractère aléatoire
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
}, (jwt_payload, done) => {
    return done(null, jwt_payload.usercomics);
}));

  passport.use('login', new LocalStrategy({
    usernameField: 'username', // email
    passwordField: 'password'
  }, (email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if(!user){
        return done(null, false, { message : 'User not found'});
      }
      user.isValidPassword(password, isValid => {
        if(!isValid){
          return done(null, false, { message : 'Wrong Password'});
        }
        return done(null, user, { message : 'Logged in Successfully'});
      });
    });
  }));


// passport.use('signup', new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
//   }, (email, password, done) => {
//     console.log(email);
//     Usercomics.create({ email, password }, (err, usercomics) => done(err, usercomics));
//   }));
