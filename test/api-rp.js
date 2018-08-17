//const request = require('request');
var rp = require('request-promise');


const API = 'https://api.cryptonator.com/api/full/btc-usd';

var resp = 'kurac';


var options = {
    uri: API,
    json: true
};
 
rp(options)
    .then(function (repos) {
        resp = repos;
    })
    .catch(function (err) {
        // API call failed...
    });


console.log(resp);