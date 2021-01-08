// const asyncMiddleware = require('../middleware/async');
const { admin } = require('../middleware/admin');
const { auth } = require('../middleware/auth');
const { Genre, validateGenre } = require('../models/genre');
const express = require('express');
const router = express.Router();

// const genres = [
//     {id: 1, name: 'Action'},
//     {id: 2, name: 'Horror'},
//     {id: 3, name: 'Documnetary'},
// ]

router.get('/', auth, async (req, res, next) => {
        const genres = await Genre.find();
        res.send(genres);
});

router.post('/', auth, async (req, res) => {
    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.message);
    // console.error(error.details[0].message);

    // const genre = {
    //     id: genres.length + 1,
    //     name: req.body.name
    // };

    let genre = new Genre({
        name: req.body.name
    });

    genre = await genre.save();
    // genres.push(genre);
    res.send(genre);
});

router.put('/:id', auth, async (req, res) => {

    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name}, {
        new: true
    });
    
    // const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    
    // genre.name = req.body.name; 
    res.send(genre);

});

router.delete('/:id', [auth, admin], async (req, res) => {

    const genre = await Genre.findByIdAndRemove(req.params.id);
    // const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    // const index = genres.indexOf(genre);
    // genres.splice(index, 1);
    res.send(genre);
});

router.get('/:id', auth, async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    // const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
});

module.exports = router; 