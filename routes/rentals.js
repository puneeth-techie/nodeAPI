// const asyncMiddleware = require('../middleware/async');
const { admin } = require('../middleware/admin');
const { auth } = require('../middleware/auth');
const express = require('express');
const Fawn = require('fawn');
const router = express.Router();
const { Rental, validateRental } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const mongoose = require('mongoose');

Fawn.init(mongoose);

router.get('/', auth, async (req, res) => {
    const rental = await Rental.find();
    res.send(rental);
});

router.post('/', auth, async (req, res) => {
    const { error } = validateRental(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid Customer');

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Invalid Movie');

    if(movie.numberInStock === 0) return res.status(400).send('Movie not in the Stock.');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
            isGold: customer.isGold
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },

    });

    try {
        new Fawn.Task()
        .save('rentals', rental)
        .update('movies', { _id: movie._id }, {
            $inc: { numberInStock: -1 }
        })
        .run();
    // const rental = await rental.save();
    // movie.numberInStock--;
    // movie.save();
    res.send(rental);
    }
    catch(ex){
        res.status(500).send('Something Failed.');
    }
});

router.get('/:id',auth, async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    if(!rental) return res.status(400).send('Invalida Rental');
    res.send(rental);
});

router.delete('/:id',[auth, admin], async (req, res) => {
    const rental = await Rental.findByIdAndRemove(req.params.id);
    if(!rental) return res.status(400).send('Invalida Rental');
    res.send(rental);
});

module.exports = router;
