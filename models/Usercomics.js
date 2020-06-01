const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
// utilisation d'un hook pour crypter le mot de passe
const bcrypt = require('bcrypt');


const UsercomicsSchema =  new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


UsercomicsSchema.plugin(passportLocalMongoose);
UsercomicsSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });
});
UsercomicsSchema.methods.isValidPassword = function(password, done) {
    bcrypt.compare(password, this.password, (err, isEqual) => done(isEqual));
};



module.exports = mongoose.model('usercomics', UsercomicsSchema);