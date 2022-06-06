const Strategy = require('passport-local/lib');

const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Models = require('./models.js'),
    passportJWT = require('passport-jwt');

let Users = Models.User,
    JWTStrategy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJwt;


// Passport strategy
// Defines basic HTTP authentication 
passport.use(new LocalStrategy({
    usernameField: 'Username',
    passwordField: 'Password'
}, (username, password, callback) => {
    console.log(username + ' ' + password);
    Users.findOne({ Username: username }, (err, user) => {
        if (err) {
            console.log(error);
            return callback(error);
        }
        if (!user) {
            console.log('Incorrect username');
            return callback(null, false, { message: 'Incorrect username or password' });
        }

        if (!user.validatePassword(password)) {
            console.log('Incorrect password');
            return callback(null, false, { message: 'Incorrect password.' });
        }

        console.log('Finished');
        return callback(null, user);
    });
}));

// Passport strategy
// Authenticates users based on JWT submitted alongside req 
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
}, (jwtPayload, callback) => {
    return Users.findById(jwtPayload._id)
        .then((user) => {
            return callback(null, user);
        })
        .catch((error) => {
            return callback(error)
        });
}));