const express = require('express');
const router = express.Router();


// var passport = require('passport');
// var Usercomics = require('../models/Usercomics');
// var Comics = require('../models/Comics')

// var Comics = require('../models/Comics'); router.get('/comics',(req, res) => {
//   Comics.find().populate('usercomics').sort({createdAt: -1}).exec((err, comics) => {
//     res.json(comics);
//   });
// });

// router.get('/comics', (req, res) => {
//   Comics.find().populate('usercomics').sort({ createdAt: -1 }).exec((err, comics) => {
//     res.json(comics);
//   });
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Comics' });
});

/*
  Authentification
 */
// router.get('/register', (req, res) => {
//   res.render('register', { title: 'Créer un compte' });
// });

// router.post('/register', (req, res) => {
//   const newUsercomics = new Usercomics({ nom: req.body.nom, email: req.body.email });
//   Usercomics.register(newUsercomics, req.body.mdp, (err, usercomics) => {
//     if (err) {
//       // console.log(err);
//       return res.render('register', { title: 'Créer un compte' });
//     }
//     console.log(router.post);
//     res.redirect('/');
//   });
// });

// router.post('/login', passport.authenticate('local'), (req, res) => {
//   res.redirect('/comics');
// });



module.exports = router;
