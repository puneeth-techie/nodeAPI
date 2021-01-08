// const asyncMiddleware = require('../middleware/async');
const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');
const { Customer, validateCustomer} = require('../models/customer');
const express = require('express');
const router = express.Router();

// const genres = [
//     {id: 1, name: 'Action'},
//     {id: 2, name: 'Horror'},
//     {id: 3, name: 'Documnetary'},
// ]
router.get('/', auth, async (req, res) => {
    const customer = await Customer.find();
    res.send(customer);
});

router.post('/', auth, async (req, res) => {
    const { error } = validateCustomer(req.body);
    if(error) return res.status(400).send(error.message);
    // console.error(error.details[0].message);

    // const genre = {
    //     id: genres.length + 1,
    //     name: req.body.name
    // };

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    customer = await customer.save();
    // genres.push(genre);
    res.send(customer);
});

router.put('/:id', auth, async (req, res) => {

    const { error } = validateCustomer(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, { 
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    }, {
        new: true
    });
    
    // const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    
    // genre.name = req.body.name; 
    res.send(customer);

});

router.delete('/:id', [auth, admin], async (req, res) => {

    const customer = await Customer.findByIdAndRemove(req.params.id);
    // const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  
    // const index = genres.indexOf(genre);
    // genres.splice(index, 1);
    res.send(customer);
});

router.get('/:id', auth, async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    // const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    res.send(customer);
});

module.exports = router; 