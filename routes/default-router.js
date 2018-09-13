const express = require('express');

const Router = express.Router();


Router.param('price', (req, res, next, price) => {

    if (isNaN(price)) {
        req.price = 0;
    }
    else {
        req.price = Number(price).toFixed(2);
    }

    next();

});


Router.get('/add/:price', (req, res) => {
    /**
     * Add target price to mydata.
     */    

    if (!req.price) {
        res.status(400).send(mydata);
    }
    else {
        /**
         * Check if already exists,
         * don't duplicate.
         */
        const index = mydata.targets.indexOf(req.price);

        if (index === -1) {
            mydata.targets.push(req.price);
            mydata.targets.sort();
        }

        res.status(201).send(mydata);
    }

});


Router.get('/remove/:price', (req, res) => {
    /**
     * Remove specific target price from mydata.
     */

    const index = mydata.targets.indexOf(req.price);

    if (index === -1) {
        // does not exist
        res.status(404).send(mydata);
    }
    else {
        // all ok, target price removed
        mydata.targets.splice(index, 1);
        res.status(201).send(mydata);
    }

});


Router.get('/clear', (req, res) => {
    /**
     * Reset => Remove all target prices in mydata.
     */

    mydata.targets = [];
    res.status(200).send(mydata);

});


Router.get('/tolerance/:price', (req, res) => {
    /**
     * Change tolerance in mydata.
     * 
     * NOTE:
     *  See in mydata.js what this does.
     */

    mydata.tolerance = req.price;
    res.status(201).send(mydata);

});


Router.get('/on', (req, res) => {
    /**
     * Turn ON alarm.
     * "silent" in mydata is now 0 (false).
     */

    mydata.silent = false;
    res.status(200).send(mydata);

});


Router.get('/off', (req, res) => {
    /**
     * Turn OFF alarm.
     * "silent" in mydata is now 1 (true).
     * 
     * NOTE:
     *  Does not clear "targets" in mydata, only silences alarm.
     */

    mydata.silent = true;
    res.status(200).send(mydata);

});


Router.get('/', (req, res) => {

    res.status(200).send(mydata);

});


module.exports = Router;
