const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
// utilisation d'un hook pour crypter le mot de passe
const bcrypt = require('bcrypt');


const UsercomicsSchema =  new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    mdp: {
        type: String,
        required: true
    }
    
    
});
UsercomicsSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',

})

const Usercomics = mongoose.model('Usercomics', UsercomicsSchema)

// module.exports = Usercomics

UsercomicsSchema.pre('save', function(next) {
    bcrypt.hash(this.mdp, 10, (err, hash)=> {
        this.mdp = hash;
        next();
    });
});

UsercomicsSchema.methods.isValidPassword = function(mdp, done) {
    bcrypt.compare(mdp, this.mdp, (err, isEqual) => done(isEqual));
}

// UsercomicsSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('usercomics', UsercomicsSchema);