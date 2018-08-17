const express = require('express');

const Router = express.Router();


Router.get('/add/:price', (req, res) => {
    /**
     * Add target price to mydata.
     */

    if (isNaN(req.params.price)) {
        // not a number
        res.status(400).send(mydata);
    }
    else {
        // valid number
        const price = Number(req.params.price);
        const index = mydata.targets.indexOf(price);

        /**
         * Check if already exists,
         * don't duplicate.
         */
        if (index === -1) {
            mydata.targets.push(price);
            mydata.targets.sort();
        }

        res.status(201).send(mydata);
    }

});


Router.get('/remove/:price', (req, res) => {
    /**
     * Remove specific target price from mydata.
     */

    if (isNaN(req.params.price)) {
        // not a number
        res.status(400).send(mydata);
    }
    else {
        // valid number
        const price = Number(req.params.price);
        const index = mydata.targets.indexOf(price);

        if (index === -1) {
            // does not exist
            res.status(404).send(mydata);
        }
        else {
            // all ok, target price removed
            mydata.targets.splice(index, 1);
            res.status(201).send(mydata);
        }
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

    if (isNaN(req.params.price)) {
        // not a number
        res.status(400).send(mydata);
    }
    else {
        // valid number
        const price = Number(req.params.price);
        mydata.tolerance = price.toFixed(2);
        res.status(201).send(mydata);
    }

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
