require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

module.exports = function(){
    winston.exceptions.handle(
        new winston.transports.Console({ colorize: true, prettyPrint: true}),
        new winston.transports.File({ filename: 'unCaughtExceptions.log' })
    );

    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

    // winston.add(winston.transports.File, { filename: 'logfile.log'});

    // winston.add(new winston.transports.MongoDB({
    //     db: 'mongodb://localhost/nodeAPIProject',
    //     level: 'info'
    // }));
}