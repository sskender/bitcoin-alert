const priceTargetSchema = require('../models/price-target');    // this is model
const coinSchema = require('../models/coin');                   // this is model

var player = require('play-sound')();


var Alarm = function () {

    /**
     * Check if current price matches any of the target prices.
     * 
     * NOTE:
     *  Loop through coins collection
     *  Grab price for each coin
     *  Compare it to each price for that specific coin in targetprices collection (this is handled by query, not loops)
     */

    coinSchema
        .find()
        .exec()
        .then(doc => {

            doc.forEach(element => {

                priceTargetSchema
                    .find()
                    .where('price').gte(element.price - element.tolerance).lte(element.price + element.tolerance)
                    .exec()
                    .then(doc => {
                        
                        // if query not empy and alarm not silent TRIGGER ALARM
                        if (doc.length && !Config.silent) {
                            console.info("[!] Alarm triggered");
                            player.play('./notifications/' + Config.alarm, function (err) {});
                        }

                    })
                    .catch(err => {

                    });

            });

        })
        .catch(err => {

        });

}


module.exports = Alarm;
