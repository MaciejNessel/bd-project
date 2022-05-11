const mongoose = require('mongoose');
const Item = require('./Item');
const Schema = mongoose.Schema

const item_in_orderSchema = new Schema({
    item_id: {
        type: String,
        required: true
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
    },      //gender zawiera sie w item
    size: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        required: true
    }
})

const orderSchema = new Schema( {
    user_id: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['unpaid', 'paid', 'cancelled']
    },
    products: {
        type: [item_in_orderSchema],
        required: true
    }});

const Order = mongoose.model('Order', orderSchema)
module.exports = Order