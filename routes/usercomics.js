var express = require('express');
var router = express.Router();
var Usercomics = require('../models/Usercomics');

/* GET User. */
router.get('/', function(req, res, next) {
    Usercomics.find().exec((err, usercomics) => {
        res.json(usercomics)
    })
});

router.post('/', (req, res) => {
    const usercomics = new Usercomics({
        nom: req.body.nom,
        email: req.body.email,
        mdp: req.body.mdp,
       //listcomics: req.body.listcomics
    });
    usercomics.save((err, newUsercomics) => {
        if (err) return res.json(err);
        res.json(newUsercomics);
    });
});


module.exports = router;