const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    wishList: {
        type: Array,
        default: []
    },
    cart: {
        type: Array,
        default: []
    },
    orders: {
        type: Array,
        default: []
    }
})

module.exports = User = mongoose.model('user', UserSchema);