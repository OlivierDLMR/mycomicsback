const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Usercomics = require('../models/Usercomics');

exports.register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            const newUsercomics = new Usercomics({
                username: req.body.username,
                email: req.body.email,
                password: hash
            });
            Usercomics.register(newUsercomics, req.body.password, (err, user) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json(err);
                }
                res.json(usercomics);
            })
        }
    );
};

exports.login = (req, res, next) => {
    passport.authenticate('login', (err, usercomics, info) => {
        if (err) return next(err);
        if (!usercomics) {
            const error = new Error(info.message);
            return next(error);
        }
        req.login(usercomics, {session: false}, err => {
            if (err) return next(err);
            const body = {_id: usercomics._id, username: usercomics.username};
            const token = jwt.sign({usercomics: body}, 'top_secret');
            return res.json({token, usercomics});
        });
    })(req, res, next);
};

