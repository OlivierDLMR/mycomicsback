require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MongoStore = require('connect-mongo')(session);

const User = require('./models/Usercomics');

//routes App
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/usercomics');
const comicsRouter = require('./routes/comics');


const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
  socket.on('new-message', message => socket.broadcast.emit('show-message', message));
});

// middleware all requests from all origins to access API.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));
//router handler for images
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(session({
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  secret: 'changethis',
  resave: false,
  saveUninitialized: false
}));

//passport authentification
require('./middleware/auth');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// used routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/comics', comicsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(err);
  res.status(err.status || 500);
  res.json('error');
});

app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use((err, req, res, next) => {
  // This check makes sure this is a JSON parsing issue, but it might be
  // coming from any middleware, not just body-parser:

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error(err);
    return res.sendStatus(400); // Bad request
  }

  next();
});


module.exports = app;
