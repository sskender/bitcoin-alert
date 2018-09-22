const express = require('express');
const mongoose = require('mongoose');
const priceTarget = require('../models/price-target');  // this is model

const Router = express.Router();



Router.param('price', (req, res, next, price) => {

    if (isNaN(price)) {
        req.price = undefined;
        req.success = false;
        req.error = "Price must be of type Number";
    }
    else if (price < 0) {
        req.price = undefined;
        req.success = false;
        req.error = "Price can not be less than zero";
    }
    else {
        req.price = Number(price).toFixed(2);
        req.success = true;
    }

    next();

});


Router.param('id', (req, res, next, id) => {

    req._id = id;
    next();

});



Router.get('/add/:price', (req, res) => {
    /**
     * Add target price to database.
     */

    if (!req.success) {

        // 400 = bad request
        res.status(400).json({
            success: req.success,
            error: req.error
        });

    }
    else {

        // create entry
        const newTarget = new priceTarget({
            _id: new mongoose.Types.ObjectId(),
            price: req.price
        });
        
        // using promises
        newTarget
            .save()
            .then(result => {
                // 201 = created
                res.status(201).json({
                    success: true,
                    priceTarget: result
                });
            })
            .catch(err => {
                // 500 = internal server error
                res.status(500).json({
                    success: false,
                    error: err
                });
            });
        
    }

});


Router.get('/remove/:price', (req, res) => {
    /**
     * Remove target price from database.
     */

    // dont query if price is not valid
    if (req.success) {

        priceTarget.deleteMany({price: req.price}, function (err) {
            if (err) {
                // 500 = internal server error
                res.status(500).json({
                    success: false,
                    error: err
                });
            }
            else {
                // 200 = ok
                res.status(200).json({success: true});
            }
        });

    }
    else {
        // 400 = bad request
        res.status(400).json({
            success: req.success,
            error: req.error
        });

    }

});


Router.get('/clear', (req, res) => {
    /**
     * Reset => Remove all target prices from database.
     */

    priceTarget.deleteMany({price: {$gte: 0}}, function (err) {

        if (err) {
            // 500 = internal server error
            res.status(500).json({
                success: false,
                error: err
            });
        }
        else {
            // 200 = ok
            res.status(200).json({success: true});
        }

    });

});


Router.get('/targets', (req, res) => {

    priceTarget.find({price: {$gte: 0}})
        .exec()
        .then(doc => {
            res.status(200).json({
                success: true,
                priceTarget: doc
            });
        })
        .catch(err => {
            // 500 = internal server error
            res.status(500).json({
                success: false,
                error: err
            });
        });

});


Router.get('/target/:id', (req, res) => {

    priceTarget.findById(req._id)
        .exec()
        .then(doc => {
            // 200 = ok
            res.status(200).json({
                success: true,
                priceTarget: doc
            });
        })
        .catch(err => {
            // 500 = internal server error
            res.status(500).json({
                success: false,
                error: err
            });
        });

});


Router.get('/tolerance/:price', (req, res) => {
    /**
     * Change tolerance in Settings.
     * 
     * NOTE:
     *  See in settings.js what this does.
     */

    if (req.success) {

            Settings.tolerance = req.price;
            res.status(200).json({success: true});

    }
    else {

        res.status(400).json({
            success: req.success,
            error: req.error
        });

    }

});


Router.get('/on', (req, res) => {
    /**
     * Turn ON alarm.
     * "silent" in Settings is now 0 (false).
     */

    Settings.silent = false;
    res.status(200).json({success: true});

});


Router.get('/off', (req, res) => {
    /**
     * Turn OFF alarm.
     * "silent" in Settings is now 1 (true).
     * 
     * NOTE:
     *  Does not clear "targets" in database, only silences alarm.
     *  Use /clear to remove target prices.
     */

    Settings.silent = true;
    res.status(200).json({success: true});

});


Router.get('/', (req, res) => {

    res.status(200).json(Settings);

});


module.exports = Router;
