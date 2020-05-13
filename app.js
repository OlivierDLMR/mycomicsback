require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);

var Usercomics = require('./models/Usercomics');
// gestion de l'authentifacation de l'utilisateur
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// ajouter la route vers le dossier route
var usercomicsRouter = require('./routes/usercomics');
var listcomicsRouter = require('./routes/listcomics');
var comicsRouter = require('./routes/comics');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  secret: 'changethis',
  resave: false,
  saveUninitialized: false
}));

// authentifacation
app.use(passport.initialize());
app.use(passport.session());

// affichage dans l'url
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/usercomics', usercomicsRouter);
app.use('/listcomics', listcomicsRouter);
app.use('/comics', comicsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
