const express = require('express');
const router = express.Router();
const Comics = require('../models/Comics');

const multer = require('../middleware/multer');
const fs = require('fs');

/* GET Comics. */
router.get('/', function(req, res, next) {
    Comics.find().exec((err, comics) => {
        console.log(comics);
        res.json(comics)
    })
});
/* POST comics */
router.post('/', multer, (req, res) => {

    const comics = new Comics({
        titre: req.body.titre,
        editeur: req.body.editeur,
        annee: req.body.annee,
        image: req.body.image,
        scancode: req.body.scancode,
        user: req.body.usercomics,
    });
    comics.save((err, newComics) => {
        if (err) return res.json(err);
        res.json(newComics);
    });
});

// Update comics
router.put('/:id', multer, (req, res, next) => {
    let comics = new Comics({_id: req.params._id});
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        req.body.comics = JSON.parse(req.body.comics);
        comics = {
            _id: req.params.id,
            titre: req.body.comics.titre,
            editeur: req.body.comics.editeur,
            image: url + '/images/' + req.file.filename,
            annee: req.body.comics.annee,
            scancode: req.body.comics.scancode,
            userId: req.body.comics.userId
        };
    } else {
        comics = {
            _id: req.params.id,
            titre: req.body.titre,
            editeur: req.body.editeur,
            image: url + '/images/' + req.file.filename,
            annee: req.body.annee,
            scancode: req.body.scancode,
            userId: req.body.userId
        };
    }
    Comics.updateOne({_id: req.params.id}, comics).then(
        () => {
            res.sendStatus(201).json({
                message: 'Comics updated successfully'
            });
        }
    ).catch(
        (error) => {
            res.sendStatus(400).json({
                error: error
            });
        }
    );
});

// Delete comics
router.delete('/:id', (req, res, next) => {
    Comics.findOne({_id: req.params.id}).then(
        (comics) => {
            const filename = comics.img.split('/images/')[1];
            fs.unlink('images/' + filename, () => {
                Comics.deleteOne({_id: req.params.id}).then(
                    () => {
                        res.sendStatus(200).json({
                            message: 'Comics supprimé !'
                        });
                    }
                ).catch(
                    (error) => {
                        res.sendStatus(400).json({
                            error: error
                        });
                    }
                );
            });
        }
    );
});

module.exports = router;