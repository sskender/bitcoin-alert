const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const priceTargetSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    coin: String,
    price: Number
});


module.exports = mongoose.model('priceTarget', priceTargetSchema);
