const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    metaData: {
        name: {type: String, required: true, unique: true},
        price: {type: Number, required: true},
        image: {type: String, required: true},
        available: {type: String, required: true},
        description: {type: String, required: true},
        brand: {type: String, required: true}
    },
    statistics: {
        weight: {type: Number, default: 0},
        strength: {type: Number, default: 0},
        adaptability: {type: Number, default: 0},
        maximumSpeed: {type: Number, default: 0},
        stiffness: {type: Number, default: 0},
        safety: {type: Number, default: 0},

    },
    slides: {type: Array, default: []},
    rate: {type: Number, default: null},
    addedAt: {type: Date, default: Date.now}
});
module.exports = Product = mongoose.model("Product", ItemSchema);