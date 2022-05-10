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
    },
    price: {
        type: Number,
        min: 0.01,
    }});

const Order = mongoose.model('Order', orderSchema)
module.exports = Order