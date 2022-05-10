const Order = require('../models/Order')


const createOrder = (req, res, next) => {
    const orderData = new Order({
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        quantity_in_stock: req.body.quantity_in_stock,
        gender: req.body.gender
    })
    orderData.save().then(response => {
        res.json({
            message: 'Order added successfully'
        })
    }).catch(error => {
        res.json({
            message: error.name +": "+ error.message
        })
    })
}

const readAllOrders = (req, res, next) => {
    Order.find().then(response => {
        res.json({
            response
        })
    }).catch(error =>{
        res.json({
            message: error.name +": "+ error.message
        })
    })
}

module.exports = {
    createOrder, readAllOrders
}