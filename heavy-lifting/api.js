const coinSchema = require('../models/coin');                   // this is model
const request = require('request');


var realPrice = function () {

    console.info("[!] Requesting info from exchange")

    coinSchema
        .find()
        .exec()
        .then(doc => {
            /**
             * For each coin in doc:
             *      get coinCode for API
             *      make API request
             *      findOneAndUpdate:
             *          save price to database
             *          save volume to database
             */
            doc.forEach(element => {

                // request
                request({
                    url: Config.API + element.coinCode,
                    json: true
                }, function (error, response, body) {
            
                    if (!error && response != undefined && response.statusCode === 200) {
                        try {

                            coinSchema.findOneAndUpdate(
                                {
                                    coin: element.coin
                                }, 
                                {
                                    price:  Number(body.ticker.price),
                                    volume: Number(body.ticker.volume)
                                },
                                function (err, doc) {
                                    if (err) {
                                        console.error(err);
                                    }
                                });
                            
                        }
                        catch (err) {}
                    }
            
                });
                // end request

            });
        })
        .catch(err => {
            /**
             * On error, log error
             */
            console.error(err);
        });

}


module.exports = realPrice;
