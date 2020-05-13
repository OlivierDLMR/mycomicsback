const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComicsSchema =  new Schema({
    titre: {type: String, required: true},
    editeur: {type: String, required: true},
    annee: {type: Number, required: true},
    image: {type: String, required: true},
    numerocomics: {type: Number, required: true}
});

module.exports = mongoose.model('Comics', ComicsSchema);