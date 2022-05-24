const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path'),
    bodyParser = require('body-parser'),
    uuid = require('uuid')

const app = express();
app.use(bodyParser.json());


const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

app.get('/', (req, res) => {
    res.send('Welcome to myFlix!');
});

const users = [
    {
        "id": "1",
        "username": "moviefan01",
        "favoriteMovies": []
    },
    {
        "id": "2",
        "username": "marvel123",
        "favoriteMovies": ["The Avengers"]
    }
]

const movies = [
    {
        "id": "1",
        "title": "My Neighbor Totoro",
        "director": "Hayao Miyazaki",
        "genre": ["Family", "Fantasy", "Animation"],
        "year": "1988"
    },

    {
        "id": "2",
        "title": "Amelie",
        "director": "Jean-Pierre Jeunet",
        "genre": ["Romance", "Comedy"],
        "year": "2001"
    },

    {
        "id": "3",
        "title": "Inception",
        "director": "Christopher Nolan",
        "genre": ["Science-Fiction", "Action", "Adventure"],
        "year": "2010"
    },

    {
        "id": "4",
        "title": "Knives Out",
        "director": "Rian Johnson",
        "genre": ["Comedy", "Mystery", "Crime"],
        "year": "2019"
    },

    {
        "id": "5",
        "title": "Little Women",
        "director": "Greta Gerwig",
        "genre": ["Drama", "Romance"],
        "year": "2019"
    },

    {
        "id": "6",
        "title": "Moana",
        "director": "Ron Clements",
        "genre": ["Comedy", "Adventure", "Animation", "Family"],
        "year": "2016"
    },

    {
        "id": "7",
        "title": "Pride & Prejudice",
        "director": "Joe Wright",
        "genre": ["Drama", "Romance"],
        "year": "2005"
    },

    {
        "id": "8",
        "title": "Tangled",
        "director": "Byron Howard",
        "genre": ["Family", "Animation"],
        "year": "2010"
    },

    {
        "id": "9",
        "title": "(500) Days of Summer",
        "director": "Marc Webb",
        "genre": ["Drama", "Romance", "Comedy"],
        "year": "2009"
    },

    {
        "id": "10",
        "title": "Violet Evergarden: the Movie",
        "director": "Taichi Ishidate",
        "genreName": ["Fantasy", "Romance", "Drama", "Animation"],
        "year": "2020"
    }];


// Return list of movies
app.get('/movies', (req, res) => {
    // res.send('Successful GET request returning complete list of movies')
    res.status(201).json(movies);
});

// Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
app.get('/movies/:title', (req, res) => {
    res.send('Successful GET request returning title of movie')
})

// Return data about a genre (description) by name/title (e.g., “Thriller”)
app.get('/movies/genre/:genreName', (req, res) => {
    res.send('Successful GET request returning genre of movie')
})

// Return data about a director (bio, birth year, death year) by name
app.get('/movies/directors/:director', (req, res) => {
    res.send('Successful GET request returning name of director')
})

// Allow new users to register
app.post('/users', (req, res) => {
    res.send('Successful POST request adding new users')
})

// Edit user information
app.put('/users/:id', (req, res) => {
    res.send('Successful PUT request updating new users info')
})

// Add movie to users favorites list
app.post('/users/:id/:favoriteMovies', (req, res) => {
    res.send('Successful POST request updating users favorite movies')
})

// Delete movie from users favorite movies
app.delete('/users/:id/:title', (req, res) => {
    res.send('Successful DELETE request to remove movie from users list')
})

// Delete existing user
app.delete('/users/:id', (req, res) => {
    res.send('Successful DELETE request to remove user')
})

app.use(express.static('public'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Whoops, you took a wrong turn');
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});