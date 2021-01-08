// const mongoose = require('mongoose');
// const winston = require('winston');

// module.exports = function() {
//     mongoose.connect('mongodb://localhost/nodeAPIProject', { 
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true})
//     .then(() => console.info('Connected to the MongoDB...!'));
// }

const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
  const db = config.get('db');
  mongoose.connect(db)
    .then(() => winston.info(`Connected to ${db}...`));
}