const Item = require('../models/Item')
const Order = require('../models/Order')
const User = require('../models/User')


const createOrder = async (req, res, next) => {
    // Set up pricing
    for (const element of req.body.products) {
        await Item.findById(element.item_id).then(res=>{
            element.price = res.price;
        })
    }

    const orderData = new Order({
        user_id: req.body.user_id,
        date: new Date(),
        status: 'unpaid',
        products: req.body.products
    })

    orderData.save().then(response => {
        res.json({
            message: 'Order added successfully',
            status: true
        })
    }).catch(error => {
        res.json({
            message: error.name + ": " + error.message,
            status: false
        })
    })
}

const readAllOrdersByUser = async (req, res, next) => {
    let startAt = (req.body.page - 1) * req.body.limit;
    let limitTo = req.body.limit;

    const resultOrdersList = []

    Order.find({user_id: req.body.user_id}, null, {sort: {date: 'desc'}, skip: startAt, limit: limitTo}).then(async ordersByUser => {
        for (const ordersByUserElement of ordersByUser) {
            const resultOrder = {
                order_id: ordersByUserElement._id,
                date: ordersByUserElement.date,
                status: ordersByUserElement.status,
                products: []
            }

            let resultPrice = 0;

            for (const item of ordersByUserElement.products) {
                const singleItem = {};
                resultPrice += item.price * item.quantity;
                await Item.findById(item.item_id).then(res => {
                    singleItem.name = res.name;
                    singleItem.price = res.price;
                    singleItem.quantity = item.quantity;
                });
                resultOrder.products.push(singleItem);
            }
            resultOrder.resultPrice = resultPrice;
            resultOrdersList.push(resultOrder);
        }
        res.json({
            history: resultOrdersList,
            status: true
        })
    }).catch(error => {
        res.json({
            message: error.name + ": " + error.message,
            status: false
        })
    })
}

module.exports = {
    createOrder, readAllOrders: readAllOrdersByUser
}