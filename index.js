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
        "genre": "Fantasy",
        "year": "1988",
        "description": "When two girls move to the country to be near their ailing mother, they have adventures with the wondrous forest spirits who live nearby."
    },

    {
        "id": "2",
        "title": "Amelie",
        "director": "Jean-Pierre Jeunet",
        "genre": "Romance",
        "year": "2001",
        "description": "Amélie is an innocent and naive girl in Paris with her own sense of justice. She decides to help those around her and, along the way, discovers love."
    },

    {
        "id": "3",
        "title": "Inception",
        "director": "Christopher Nolan",
        "genre": "Science-Fiction",
        "year": "2010",
        "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster."
    },

    {
        "id": "4",
        "title": "Knives Out",
        "director": "Rian Johnson",
        "genre": "Mystery",
        "year": "2019",
        "description": "A detective investigates the death of the patriarch of an eccentric, combative family."
    },

    {
        "id": "5",
        "title": "Little Women",
        "director": "Greta Gerwig",
        "genre": "Drama",
        "year": "2019",
        "description": "Jo March reflects back and forth on her life, telling the beloved story of the March sisters - four young women, each determined to live life on her own terms."
    },

    {
        "id": "6",
        "title": "Moana",
        "director": "Ron Clements",
        "genre": "Adventure",
        "year": "2016",
        "description": "In Ancient Polynesia, when a terrible curse incurred by the Demigod Maui reaches Moana's island, she answers the Ocean's call to seek out the Demigod to set things right."
    },

    {
        "id": "7",
        "title": "Pride & Prejudice",
        "director": "Joe Wright",
        "genre": "Drama",
        "year": "2005",
        "description": "Sparks fly when spirited Elizabeth Bennet meets single, rich, and proud Mr. Darcy. But Mr. Darcy reluctantly finds himself falling in love with a woman beneath his class. Can each overcome their own pride and prejudice?"
    },

    {
        "id": "8",
        "title": "Tangled",
        "director": "Byron Howard",
        "genre": "Family",
        "year": "2010",
        "description": "The magically long-haired Rapunzel has spent her entire life in a tower, but now that a runaway thief has stumbled upon her, she is about to discover the world for the first time, and who she really is."
    },

    {
        "id": "9",
        "title": "(500) Days of Summer",
        "director": "Marc Webb",
        "genre": "Romance",
        "year": "2009",
        "description": "After being dumped by the girl he believes to be his soulmate, hopeless romantic Tom Hansen reflects on their relationship to try and figure out where things went wrong and how he can win her back."
    },

    {
        "id": "10",
        "title": "Violet Evergarden: the Movie",
        "director": "Taichi Ishidate",
        "genreName": "Fantasy",
        "year": "2020",
        "description": "After the aftermath of a war, a young girl who was used as a 'tool' for war learned to live. With the scars of burns, she goes back to her past to feel the true feelings of the Major's 'I love you.'"
    }];


// Return list of movies
app.get('/movies', (req, res) => {
    // res.send('Successful GET request returning complete list of movies')
    res.status(201).json(movies);
});

// Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
app.get('/movies/:title', (req, res) => {
    res.send('Successful GET request returning movie data by title')
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