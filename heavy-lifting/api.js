const request = require('request');


var realPrice = function () {

    request({

        url: mydata["API"],
        json: true

    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            try {
                mydata["price"] = Number(body["ticker"]["price"]).toFixed(2);
                
            } catch (err) {
                console.log(err);
            }

        }

    });

}


module.exports = realPrice;
