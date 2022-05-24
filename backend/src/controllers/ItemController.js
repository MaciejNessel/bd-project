const Item = require('../models/Item')

// Show list of all available items
const readAvailableItemsOfPage = (req, res, next) => {
    let startAt = (req.body.page - 1) * req.body.limit;
    let limitTo = req.body.limit;

    Item.find({quantity_in_stock: {$gt: 0}}, null, {sort: {name: 'asc'}, skip: startAt, limit: limitTo}).then(response => {
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