var express = require('express');
var router = express.Router();
var passport = require('passport');
var Usercomics = require('../models/Usercomics');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Comics' });
});

/*
  Authentification
 */
router.get('/register', (req, res) => {
  res.render('register', { title: 'Créer un compte' });
});

router.post('/register', (req, res) => {
  const newUsercomics = new Usercomics({ username: req.body.username, email: req.body.email });
  Usercomics.register(newUsercomics, req.body.password, (err, usercomics) => {
    if (err) {
      console.log(err);
      return res.render('register', { title: 'Créer un compte' });
    }

    res.redirect('/');
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.redirect('/usercomics');
});

module.exports = router;
