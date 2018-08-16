const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const Middleware = require('./middleware/default');
const Router = require('./routes/default-router');


const app = express();

const PORT = process.env.PORT || 3000;


/**
 * Logging
 */

app.use(logger('dev'));


/**
 * Body parser
 */

app.use(bodyParser.json());


/**
 * Middleware
 */

app.use(Middleware);


/**
 * Routes
 */

app.use(Router);


/**
 * Listen
 */

app.listen(PORT, () => {
    console.log("[+] Server is listening on port " + PORT);
});
