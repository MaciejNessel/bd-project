const Item = require('../models/Item')

// Show list of all available items
const readAvailableItemsOfPage = (req, res, next) => {

    let startAt = 0;
    let limitTo = 5;

    if(typeof req.body.page !== 'undefined')
        startAt = (req.body.page - 1) * req.body.limit;

    if(typeof req.body.limit !== 'undefined')
        limitTo = req.body.limit;

    let filter = 
    {
        quantity_in_stock: {$gt: 0},
        price: {}
    }

    let price_min = 0
    let price_max = -1
    
    if(typeof req.body.name !== 'undefined')
        filter.name = {$regex: "/*" + req.body.name + "/*"}

    if(typeof req.body.type !== 'undefined')
        filter.type = req.body.type

    if(typeof req.body.gender !== 'undefined')
        filter.gender = { $elemMatch: { $in: req.body.gender}}

    if(typeof req.body.size !== 'undefined')
        filter.size = req.body.size

    if(typeof req.body.price_min !== 'undefined')
        price_min = req.body.price_min
    
    if(typeof req.body.price_max !== 'undefined')
        price_max = req.body.price_max

    if(price_max == -1)
        filter.price = {
            $gte: price_min
        }
    else
        filter.price = {
            $gte: price_min,
            $lte: price_max
        }

    console.log(filter)

    Item.find(filter, null, {sort: {name: 'asc'}, skip: startAt, limit: limitTo}).then(response => {
        res.json({
            response,
            status: true
        })
    }).catch(error => {
        res.json({
            message: error.name + ": " + error.message,
            status: false
        })
    })
}

// Show list of items
const readAllItems = (req, res, next) => {
    Item.find().then(response => {
        res.json({
            response,
            status: true
        })
    }).catch(error =>{
        res.json({
            message: error.name +": "+ error.message,
            status: false
        })
    })
}

// Get single item by index
const readOneItem = (req, res, next) => {
    let itemID = req.body.itemID;
    Item.findById(itemID).then(response => {
        res.json({
            response,
            status: true
        })
    }).catch(error =>{
        res.json({
            message: error.name +": "+ error.message,
            status: false
        })
    })
}

// Create new item
const createItem = (req, res, next) => {
    const itemData = new Item({
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        quantity_in_stock: req.body.quantity_in_stock,
        gender: req.body.gender,
        price: req.body.price,
        size: req.body.size,
        imageURL: req.body.image_url
    })
    itemData.save().then(response => {
        res.json({
            message: 'Item added successfully',
            status: true
        })
    }).catch(error => {
        res.json({
            message: error.name +": "+ error.message,
            status: false
        })
    })
}


// Update item
const updateItem = (req, res, next) => {
    let itemID = req.body.itemID
    let updatedItemData = {
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        quantity_in_stock: req.body.quantity_in_stock,
        gender: req.body.gender,
        size: req.body.size,
        price: req.body.price,
        imageURL: req.body.image_url
    }
    Item.findOneAndUpdate(itemID, {$set: updatedItemData}).then(() => {
        res.json({
            message: 'Item updated successfully.',
            status: true
        })
    }).catch(error => {
        res.json({
            message: error.name +": "+ error.message,
            status: false
        })
    })
}

// Delete item by index
const deleteItem = (req, res, next) => {
    let itemId = req.body.itemID;
    Item.findOneAndRemove(itemId).then(() => {
        res.json({
            message: 'Item deleted successfully.',
            status: true
        })
    }).catch(error => {
        res.json({
            message: error.name +": "+ error.message,
            status: false
        })
    })
}


module.exports = {
    readAllItems, readOneItem, deleteItem, updateItem, createItem, readAvailableItemsOfPage
}