const Item = require('../models/Item')

// Show list of items
const readAllItems = (req, res, next) => {
    Item.find().then(response => {
        res.json({
            response
        })
    }).catch(error =>{
        res.json({
            message: error.name +": "+ error.message
        })
    })
}

// Get single item by index
const readOneItem = (req, res, next) => {
    let itemID = req.body.itemID;
    Item.findById(itemID).then(response => {
        res.json({
            response
        })
    }).catch(error =>{
        res.json({
            message: error.name +": "+ error.message
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
        gender: req.body.gender
    })
    itemData.save().then(response => {
        res.json({
            message: 'Item added successfully'
        })
    }).catch(error => {
        res.json({
            message: error.name +": "+ error.message
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
        gender: req.body.gender
    }
    Item.findOneAndUpdate(itemID, {$set: updatedItemData}).then(() => {
        res.json({
            message: 'Item updated successfully.'
        })
    }).catch(error => {
        res.json({
            message: error.name +": "+ error.message
        })
    })
}

// Delete item by index
const deleteItem = (req, res, next) => {
    let itemId = req.body.itemID;
    Item.findOneAndRemove(itemId).then(() => {
        res.json({
            message: 'Item deleted successfully.'
        })
    }).catch(error => {
        res.json({
            message: error.name +": "+ error.message
        })
    })
}


module.exports = {
    readAllItems, readOneItem, deleteItem, updateItem, createItem
}