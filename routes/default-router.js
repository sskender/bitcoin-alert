const express = require('express');
const mongoose = require('mongoose');

const priceTargetSchema = require('../models/price-target');    // this is model
const coinSchema = require('../models/coin');                   // this is model

const createUpdateCoinCollection = require('../misc/createUpdateCoin');

const Router = express.Router();





Router.param('price', (req, res, next, price) => {

    /**
     * Price validation:
     *  targets
     *  tolerance
     * 
     * req.price      => Number
     * req.priceValid => Bool
     */

    if (isNaN(price) || price < 0) {
        req.price = undefined;
        req.priceValid = false;
    }
    else {
        req.price = Number(price);
        req.priceValid = true;
    }

    next();

});


Router.param('id', (req, res, next, id) => {

    /**
     * NOTE:
     *  id stands for MongoDB ID
     * 
     * This can be used to GET JSON from database.
     * 
     * req._id => String
     */

    req._id = id;
    next();

});


Router.param('coin', (req, res, next, coin) => {

    /**
     * Coin format validation.
     * 
     * req.coin      => String
     * req.coinValid => Bool
     * req.coinCode  => E.G.: btc-usd, eth-btc
     */

    const valid = /^([a-zA-Z]{2,5})$/.test(coin);

    req.coinValid = valid;
    req.coin = (valid) ? coin.toUpperCase() : undefined;

    switch (req.coin) {
        case undefined:
            req.coinCode = undefined;
            break;

        case 'BTC':
            req.coinCode = 'BTC-USD';
            break;
    
        default:
            req.coinCode = req.coin + '-BTC';
            break;
    }

    next();

});





Router.get('/add/:coin/:price', (req, res) => {

    /**
     * Add target price for specific coin to database.
     */

    if (req.priceValid && req.coinValid) {

        // create entry
        const newTarget = new priceTargetSchema(
            {
                _id: new mongoose.Types.ObjectId(),
                coin: req.coin,
                price: req.price
            },
            {
                upsert: true
            }
        );

        // using promises
        newTarget
            .save()
            .then(result => {
                // also create coinSchema query
                createUpdateCoinCollection(req.coin, req.coinCode);

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
    else {

        // 400 = bad request
        res.status(400).json({
            success: false,
            error: "Coin format or price or both is invalid!"
        });

    }

});


Router.get('/remove/:coin/:price', (req, res) => {

    /**
     * Remove target price for specific coin from database.
     */

    if (req.priceValid && req.coinValid) {

        priceTargetSchema.deleteMany({price: req.price}, function (err) {
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
            success: false,
            error: "Coin format or price or both is invalid!"
        });

    }

});



Router.get('/clear/:coin', (req, res) => {

    /**
     * Reset => Remove all target prices for specific coin from database.
     */

    if (req.coinValid) {

        priceTargetSchema.deleteMany({price: {$gte: 0}, coin: req.coin}, function (err) {
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
            success: false,
            error: "Coin format is invalid!"
        });

    }

});



Router.get('/target', (req, res) => {

    /**
     * GET JSON with all price targets for all coins.
     * 
     * NOTE:
     *  Dump entire database.
     */

    priceTargetSchema.find()
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


Router.get('/target/:coin', (req, res) => {

    /**
     * GET JSON with all price targets for specific coin.
     */

    if (req.coinValid) {
    
        priceTargetSchema.find({coin: req.coin})
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

    }
    else {

          // 400 = bad request
          res.status(400).json({
            success: false,
            error: "Coin format is invalid!"
        });

    }

});


Router.get('/targetid/:id', (req, res) => {

    /**
     * GET JSON from database with MongoDB id.
     */

    priceTargetSchema.findById(req._id)
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



Router.get('/coin', (req, res) => {

    /**
     * GET JSON with all coins from database.
     * 
     * NOTE:
     *  Dump entire database.
     */

    coinSchema.find()
        .exec()
        .then(doc => {
            // 200 = ok
            res.status(200).json({
                success: true,
                coin: doc
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


Router.get('/coin/:coin', (req, res) => {

    /**
     * GET JSON with specific coin from database.
     */

    if (req.coinValid) {
    
        coinSchema.find({coin: req.coin})
            .exec()
            .then(doc => {
                // 200 = ok
                res.status(200).json({
                    success: true,
                    coin: doc
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
    else {

          // 400 = bad request
          res.status(400).json({
            success: false,
            error: "Coin format is invalid!"
        });

    }

});



Router.get('/tolerance/:coin/:price', (req, res) => {

    /**
     * Change tolerance price for specific coin in database.
     */

    if (req.priceValid && req.coinValid) {

        coinSchema.findOneAndUpdate(
            // find
            {
                coin: req.coin
            },
            // new data
            {
                tolerance: req.price
            },
            // callback
            function (err, doc) {
                if (err) {
                    // 500 = internal server error
                    res.status(500).json({
                        success: false,
                        error: err
                    });
                }
                else if (doc === null) {
                    // 404 = not found
                    res.status(404).json({
                        success: false,
                        error: "Coin not found in database"
                    });
                }
                else {
                    // 200 = ok
                    res.status(200).json({success: true});
                }
            }
        );

    }
    else {

        // 400 = bad request
        res.status(400).json({
            success: false,
            error: "Coin format or price or both is invalid!"
        });

    }

});





Router.get('/on', (req, res) => {
    /**
     * Turn ON alarm.
     * "silent" in Config is now 0 (false).
     */

    Config.silent = false;
    res.status(200).json({success: true});

});


Router.get('/off', (req, res) => {
    /**
     * Turn OFF alarm.
     * "silent" in Config is now 1 (true).
     * 
     * NOTE:
     *  Does not clear "targets" in database, only silences alarm.
     *  Use /clear to remove target prices.
     */

    Config.silent = true;
    res.status(200).json({success: true});

});





Router.get('/', (req, res) => {

    /**
     * Doesn't do anything
     */

    res.status(200).json({success: true});

});


module.exports = Router;
