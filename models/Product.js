const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    statistics: {type: Object, default: {}},
    slides: {type: Array, default: []},
    image: {type: String, required: true},
    rate: {type: Number, default: null},
    brand: {type: String, required: true},
    addedAt: {type: Date, default: Date.now}
});
module.exports = Product = mongoose.model("Product", ItemSchema);