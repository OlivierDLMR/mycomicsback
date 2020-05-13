var express = require('express');
var router = express.Router();
var Listcomics = require('../models/Listcomics');

/* GET Listcomics. */
router.get('/', function(req, res, next) {
    Listcomics.find().exec((err, listcomics) => {
        res.json(listcomics)
    })
});

router.post('/', (req, res) => {
    const listcomics = new Listcomics({
        titre: req.body.titre,
        editeur: req.body.editeur,
        annee: req.body.annee,
        partage: req.body.partage,
        image: req.body.image,
        numerocomics: req.body.numerocomics
        
    });
    listcomics.save((err, newListcomics) => {
        if (err) return res.json(err);
        res.json(newListcomics);
    });
});


module.exports = router;