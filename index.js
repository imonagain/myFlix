const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path'),
    bodyParser = require('body-parser'),
    uuid = require('uuid'),
    mongoose = require('mongoose'),
    Models = require('./models.js');

//mongoose models
const Movies = Models.Movie;
const Users = Models.User;

const app = express();

//connection to mongodb
mongoose.connect('mongodb://localhost:27017/myFlixDB',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch((error) => console.log(error)
    );

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' });

app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to myFlix!');
});

// GET list of movies
// WORKING
app.get('/movies', (req, res) => {
    Movies.find()
        .then((movies) => {
            res.status(200).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        })
});

// POST new user
// SUCCESS
app.post('/users', (req, res) => {
    Users.findOne({ Username: req.body.Username })
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.Username + ' already exists');
            } else {
                Users
                    .create({
                        Username: req.body.Username,
                        Password: req.body.Password,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday
                    })
                    .then((user) => {
                        res.status(201).json(user)
                    })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).send('Error: ' + error);
                    })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

// GET all users
// SUCCESS
app.get('/users', (req, res) => {
    Users.find()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

// GET USER INFO BY USERNAME
// SUCCESS
app.get('/users/:Username', (req, res) => {
    Users.findOne({ Username: req.params.Username })
        .then((user) => {
            res.json(user);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

// UPDATE USER INFO
// SUCCESS
app.put('/users/:Username', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
        $set:
        {
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
        }
    },
        { new: true },
        (error, updatedUser) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error: ' + error);
            } else {
                res.json(updatedUser);
            }
        });
});

// DELETE existing user
// SUCCESS
app.delete('/users/:Username', (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
        .then((user) => {
            if (!user) {
                return res.status(400).send(req.params.Username + ' does not exist');
            } else {
                res.status(200).send(req.params.Username + ' was successfully deleted');
            }
        })
        .catch((error) => {
            console.error(error)
            res.status(500).send('Error: ' + error);
        });
})

// ================ ERRORS ===========================

// GET movie by title
// returns empty array
app.get('/movies/:Title', (req, res) => {
    Movies.find({ Title: req.params.Title })
        .then((movie) => {
            res.json(movie);
            console.log("Hello world")
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        })
})

// GET director info
// currently "Director Not Found"
app.get('/movies/directors/:Name', (req, res) => {
    Movies.findOne({ 'Director.Name': req.params.Name })
        .then((director) => {
            if (director) {
                res.status(201).json(director);
            } else {
                res.status(400).send('Director Not Found')
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

// UPDATE to add new favorite movie
// currently returnning null
app.post('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username },
        {
            $addToSet: { FavoriteMovies: req.params.MovieID }
        },
        { new: true },
        (error, updatedUser) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error: ' + error);
            } else {
                res.json(updatedUser);
            }
        });
});

// DELETE user favorite movie
// currently returns null
app.delete('/users/:Username/favorites/:MovieID', (req, res) => {
    Users.findOneAndRemove({ Username: req.params.UserName },
        {
            $pull:
            {
                FavoriteMovies: req.params.MovieID
            }
        },
        { new: true },
        (error, updatedUser) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error:' + error)
            } else {
                res.json(updatedUser);
            }
        })
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Whoops, you took a wrong turn');
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});