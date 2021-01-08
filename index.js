const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/production')(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.info(`Listening on port ${port}...`);
});