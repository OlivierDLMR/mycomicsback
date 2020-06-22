const express = require('express');
const passport = require('passport');
const User = require('../models/Usercomics');
const router = express.Router();

const userCtrl = require('../controllers/usercomics');

// GET users 
router.get('/', passport.authenticate('jwt', { session : false }), (req, res, next) => {
  res.json({
      message : 'You made it to the secure route',
      user : req.usercomics,
      token : req.query.secret_token
  })
});
// auth+register
router.post('/', userCtrl.register);
router.post('/login', userCtrl.login);

router.put('/users/:id', (req, res, next, err) => {
  const user = new User({
      _id: req.params.id,
      username: req.body.username,
      email: req.body.email,

  });
  User.updateOne({_id: req.params.id}, user).then(() => {
      if (err) return res.json(err);
      res.json(User);
  });
});

module.exports = router;