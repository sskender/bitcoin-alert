require('dotenv').load();

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const Middleware = require('./middleware/default');
const Router = require('./routes/default-router');

const realPrice = require('./heavy-lifting/api');
const Alarm = require('./heavy-lifting/alarm');


const app = express();

const PORT = process.env.PORT || 3000;


/**
 * Database
 */

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});


/**
 * Settings
 */

Settings = require('./settings');


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
 * Monitor price and trigger alarm
 */

setInterval(realPrice, 180000);
setInterval(Alarm, 60000);


/**
 * Listen
 */

app.listen(PORT, () => {
    console.log("[+] Server is listening on port " + PORT);
});
