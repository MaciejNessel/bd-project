const Item = require('../models/Item')
const Order = require('../models/Order')
const User = require('../models/User')

const createOrder = (req, res, next) => {

    // Set up pricing
    req.body.products.forEach(element => {
        element.price = Item.findOne({'_id': element.item_id}).select('price');
    })

    const orderData = new Order({
        user_id: req.body.user_id,
        date: new Date(),
        status: 'unpaid',
        products: req.body.products
    })

    print("test")

    orderData.save().then(response => {
        res.json({
            message: 'OrderHistory added successfully'
        })
    }).catch(error => {
        res.json({
            message: error.name +": "+ error.message
        })
    })
}

const readAllOrders = (req, res, next) => {
    Order.find({'user_id' : req.body.user_id}).then(response => {
        
        // Set up resultPrice and add name
        var resultPrice = 0;
        response.products.array.forEach(element => {
            resultPrice += element.price * element.quantity;
            element.name = Item.findOne({'_id': element.item_id}).select('name');
        });
        response.resultPrice = resultPrice;        
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