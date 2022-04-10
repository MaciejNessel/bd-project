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
        type: String,
        enum: ['woman', 'men', 'kids'],
        required: true
    }});

const Item = mongoose.model('Item', itemSchema)
module.exports = Item