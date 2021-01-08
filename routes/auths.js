// const asyncMiddleware = require('../middleware/async');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(errr.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Invalid email and password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid Password.');

    const token = user.generateAuthToken();
    res.send(token);

});

function validate(req){
    const schema = {
        email: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(req, schema);
}

module.exports = router;