const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path');

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' });

app.use(morgan('combined', { stream: accessLogStream }));

app.get('/', (req, res) => {
    res.send('Welcome to myFlix!');
});

const movies = [
    {
        "id": "1",
        "title": "My Neighbor Totoro",
        "director": "Hayao Miyazaki",
        "year": "1988"
    },

    {
        "id": "2",
        "title": "Amelie",
        "director": "Jean-Pierre Jeunet",
        "year": "2001"
    },

    {
        "id": "3",
        "title": "Inception",
        "director": "Christopher Nolan",
        "year": "2010"
    },

    {
        "id": "4",
        "title": "Knives Out",
        "director": "Rian Johnson",
        "year": "2019"
    },

    {
        "id": "5",
        "title": "Little Women",
        "director": "Greta Gerwig",
        "year": "2019"
    },

    {
        "id": "6",
        "title": "Moana",
        "director": "Ron Clements",
        "year": "2016"
    },

    {
        "id": "7",
        "title": "Pride & Prejudice",
        "director": "Joe Wright",
        "year": "2005"
    },

    {
        "id": "8",
        "title": "Tangled",
        "director": "Byron Howard",
        "year": "2010"
    },

    {
        "id": "9",
        "title": "(500) Days of Summer",
        "director": "Marc Webb",
        "year": "2009"
    },

    {
        "id": "10",
        "title": "Violet Evergarden: the Movie",
        "director": "Kyoto Animation",
        "year": "2020"
    }];


app.get('/movies', (req, res) => {
    res.json(movies)
});

app.use(express.static('public'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Whoops, you took a wrong turn');
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});