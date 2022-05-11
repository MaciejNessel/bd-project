const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema( {
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    quantity_in_stock: {
        type: Number,
        required: true,
    },
    gender: {
        type: [String],
        enum: ['woman', 'man', 'kid'],
        required: true
    },
    size: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        required: true
    },
    price: {
        type: Number,
        min: 0.01,
        required: true
    }});

const Item = mongoose.model('Item', itemSchema)
module.exports = Item