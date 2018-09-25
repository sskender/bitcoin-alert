const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const coinSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    coin: String,
    tolerance: Number,
    price: Number,
    volume: Number
});


module.exports = mongoose.model('coin', coinSchema);
