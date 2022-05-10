const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema( {
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    item_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    quantity: {
        type: Number,
        min: 1,
        required: true
    },
    price: {
        type: Number,
        min: 0.01,
        required: true
    },
    size: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        required: true
    }});

const Order = mongoose.model('Order', orderSchema)
module.exports = Order