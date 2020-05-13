const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScancodeSchema =  new Schema({
    titre: {type: String, required: true},
    editeur: {type: String, required: true},
    annee: {type: Number, required: true},
    image: {type: String, required: true}
});

module.exports = mongoose.model('Scancode', ScancodeSchema);

