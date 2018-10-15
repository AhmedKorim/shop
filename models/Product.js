const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},

    statistics: {
        type: Object, default: {
            weight: 0,
            strength: 0,
            adaptability: 0,
            maximumSpeed: 0,
            stiffness: 0,
            safety: 0,
        }
    },
    slides: {type: Array, default: []},
    rate: {type: Number, default: null},
    brand: {type: String, required: true},
    addedAt: {type: Date, default: Date.now}
});
module.exports = Product = mongoose.model("Product", ItemSchema);