const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

/* GET User. */
// router.get('/', function(req, res, next) {
//     Usercomics.find().exec((err, usercomics) => {
//         res.json(usercomics)
//     })
// });


router.post('/signup', passport.authenticate('signup', { session : false }) , (req, res, next) => {
    res.json({ message : 'Signup successful', usercomics : req.usercomics });
  });
  
  router.post('/login', (req, res, next) => {
    passport.authenticate('login', (err, usercomics, info) => {
      if(err) return next(err);
      if(!usercomics) {
        const error = new Error(info.message);
        return next(error);
      }
      req.login(usercomics, { session : false }, err => {
        if(err) return next(err);
        const body = { _id: usercomics._id, email: usercomics.nom };
        const token = jwt.sign({ usercomics : body }, 'top_secret');
        return res.json({ token });
      });
    })(req, res, next);
  });

router.get('/profile', passport.authenticate('jwt', { session : false }), (req, res, next) => {
    res.json({
        message : 'You made it to the secure route',
        user : req.usercomics,
        token : req.query.secret_token
    })
  });


// router.post('/', (req, res) => {
//     const usercomics = new Usercomics({
//         nom: req.body.nom,
//         email: req.body.email,
//         mdp: req.body.mdp,

//     });
//     usercomics.save((err, newUsercomics) => {
//         if (err) return res.json(err);
//         res.json(newUsercomics);
//     });
// });


module.exports = router;