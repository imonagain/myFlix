const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

let movieSchema = mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Director: {
        Name: String,
        Bio: String
    },
    Genre: {
        Name: String,
        Description: String
    },
    Year: String,
    Description: String,
});



let userSchema = mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Birthday: Date,
    FavoriteMovies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }]
});

userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.Password);
};

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;