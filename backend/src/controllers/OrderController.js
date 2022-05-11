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
            message: 'OrderHistory added successfully'
        })
    }).catch(error => {
        res.json({
            message: error.name + ": " + error.message
        })
    })
}

const readAllOrdersByUser = (req, res, next) => {
    var resultPrice = 0;
    Order.find({'user_id' : req.body.user_id}).then(response => {
        response.array.forEach(element => {
            console.log(element);
        });


        /*response.products.array.forEach(element => {
            resultPrice += element.price * element.quantity;
            Item.findById(element.item_id).then(res=>{
                element.name = res.name;
            })
        });
        response.resultPrice = resultPrice;
        */
        
        
        console.log(response);
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
    createOrder, readAllOrders: readAllOrdersByUser
}