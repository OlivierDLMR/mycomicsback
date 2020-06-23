const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

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
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    comics: {type: Schema.Types.ObjectId, ref: 'Comics'}
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

module.exports = mongoose.model('Usercomics', UsercomicsSchema);