const coinSchema = require('../models/coin');                   // this is model


var createCoinCollection = function (coin, coinCode, tolerance=0) {

    var query   = {
        coin: coin
    };
    var update  = {
        coin: coin,
        coinCode: coinCode,
        tolerance: tolerance,
        price: 0,
        volume: 0
    };
    var options = {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
    };

    coinSchema.findOneAndUpdate(query, update, options, function (err, doc) {
        if (err) {
            console.error(err);
        }
    });

}


module.exports = createCoinCollection;
