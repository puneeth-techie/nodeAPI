const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function() {
    mongoose.connect('mongodb://localhost/nodeAPIProject', { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true})
    .then(() => console.info('Connected to the MongoDB...!'));
}