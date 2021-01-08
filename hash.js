const bcrypt = require('bcrypt');

async function run(){
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash('1234', salt);
    console.log(salt);
    console.log(hashed);
}

run();

/**
 * // Hashing passwords
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(‘1234’, salt);
// Validating passwords
    const isValid = await bcrypt.compare(‘1234’, hashed);
 */

 /**
  * // Generating a JWT
    const jwt = require(‘jsonwebtoken’);
    const token = jwt.sign({ _id: user._id}, ‘privateKey’);

- When appropriate, encapsulate logic in Mongoose models:
// Adding a method to a Mongoose model
    userSchema.methods.generateAuthToken = function() {
    }
    const token = user.generateAuthToken();
  */
