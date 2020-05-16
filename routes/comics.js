var express = require('express');
var router = express.Router();
var Comics = require('../models/Comics');

/* GET Comics. */
router.get('/', function(req, res, next) {
    Comics.find().exec((err, comics) => {
        res.json(comics)
    })
});

router.post('/', (req, res) => {
    const comics = new Comics({
        titre: req.body.titre,
        editeur: req.body.editeur,
        annee: req.body.annee,
        image: req.body.image,
        scancode: req.body.scancode,
        usercomics: req.body.usercomics,
        
        
    });
    comics.save((err, newComics) => {
        if (err) return res.json(err);
        res.json(newComics);
    });
});


module.exports = router;