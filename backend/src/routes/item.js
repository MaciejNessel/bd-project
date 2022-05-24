const express = require('express')
const router = express.Router()

const ItemController = require('../controllers/ItemController')

router.post('/', ItemController.readAvailableItemsOfPage)
router.post('/read', ItemController.readOneItem)
router.post('/create', ItemController.createItem)
router.post('/update', ItemController.updateItem)
router.post('/delete', ItemController.deleteItem)


module.exports = router
