// const asyncMiddleware = require('../middleware/async');
const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const { Movie, validateMovie } = require('../models/movie');
const { Genre } = require('../models/genre');

router.get('/', async (req, res) => {
    const result = await Movie.find();
    res.send(result);
});

router.post('/', auth, async (req, res) => {
    const { error } = validateMovie(req.body);
    if(error) return res.status(400).send(error.message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid Genre.');

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    const result = await movie.save();
    res.send(result);
});

router.put('/:id', auth, async (req, res) => {

    const { error } = validateMovie(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const movie = await Movie.findByIdAndUpdate(req.params.id, { 
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, {
        new: true
    });
    
    // const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('The movie with the given id was not found.');
    
    // genre.name = req.body.name; 
    res.send(movie);

});

router.delete('/:id', [auth, admin], async (req, res) => {

    const movie = await Movie.findByIdAndRemove(req.params.id);
    // const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('The movie with the given id was not found.');
  
    // const index = genres.indexOf(genre);
    // genres.splice(index, 1);
    res.send(movie);
});

router.get('/:id', auth, async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    // const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('The movie with the given id was not found.');
    res.send(movie);
});

module.exports = router;