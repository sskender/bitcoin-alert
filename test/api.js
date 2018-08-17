const request = require('request');


const API = 'https://api.cryptonator.com/api/full/btc-usd';

var resp;


request({
        url: API,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            resp = body;
        }
});


setTimeout(function() {
    console.log(resp);
}, 5000);
