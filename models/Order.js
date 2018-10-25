const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    orderDate: {
        type: Date,
        default: Date.now()
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            count: {
                type: Number,
                required: true
            }
        }
    ]
})

module.exports = Order = mongoose.model('order', OrderSchema);