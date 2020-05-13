const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UsercomicsSchema =  new mongoose.Schema({
    nom: {type: String, required: true},
    email: {type: String, required: true},
    mdp: {type: String, required: true},
    //listcomics: {type: ObjectId, required: true}
});



module.exports = mongoose.model('Usercomics', UsercomicsSchema);