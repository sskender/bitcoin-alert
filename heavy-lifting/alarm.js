const mongoose = require('mongoose');
const priceTarget = require('../models/price-target');  // this is model
var player = require('play-sound')();


var Alarm = function () {

    /**
     * Check if current price matches any of the target prices.
     */

    priceTarget.find({price: {$gte: 0}})

        .exec()

        .then(doc => {

            doc.forEach(element => {

                if (Math.abs(Settings.price - element.price) < Settings.tolerance) {
                    console.info("[!] Alarm triggered");
                    if (!Settings.silent) {
                        player.play('./notifications/' + Settings.alarm, function (err) {
                            if (err) {
                                throw err;
                            }
                        });
                    }
                }

            });

        })

        .catch(err => {
            console.error("[x] Alarm error:");
            console.error(err);
        });

}


module.exports = Alarm;
