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
    wishlist: [
         {
             product: {
                 type: Schema.Types.ObjectId,
                 ref: 'Product'
             }

         }
    ],
    comparedList: [
         {
             product: {
                 type: Schema.Types.ObjectId,
                 ref: 'Product'
             }

         }
    ],
    cart: [
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

module.exports = User = mongoose.model('user', UserSchema);