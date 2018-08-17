const EventEmitter = require('events').EventEmitter;
const request = require('request');


const API = 'https://api.cryptonator.com/api/full/btc-usd';

var resp = new EventEmitter();


request({
        url: API,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log(body);
            resp.data = body;
            resp.emit('update');
        }
});


resp.on('update', function () {
    console.log('this is on update:');
    console.log(resp.data);
});
