const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComicsSchema =  new Schema({
    titre: {type: String, required: true},
    editeur: {type: String, required: true},
    annee: {type: Number, required: true},
    image: {type: String, required: false},
    scancode: {type: String, required: false},
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    users: { type: [Array],
            required: true
    }
});false

module.exports = mongoose.model('Comics', ComicsSchema);