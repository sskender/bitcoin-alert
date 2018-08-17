const request = require('request');


var realPrice = function () {

    request({

        url: mydata.API,
        json: true

    }, function (error, response, body) {

        if (!error && response != undefined && response.statusCode === 200) {

            try {
                mydata.price  = Number(body.ticker.price).toFixed(2);
                mydata.volume = Number(body.ticker.volume).toFixed(2);
                mydata.time   = new Date();
                
            } catch (err) {
                console.warn(err);  // Don't want it to be red, not that important.
            }

        }

    });

}


module.exports = realPrice;
