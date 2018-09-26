const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const coinSchema = new Schema({
    coin: String,
    coinCode: String,   /* E.G.: btc-usd, eth-btc */
    tolerance: Number,
    price: Number,
    volume: Number
});


module.exports = mongoose.model('coin', coinSchema);
