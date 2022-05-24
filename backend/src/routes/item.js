const express = require('express')
const router = express.Router()

const ItemController = require('../controllers/ItemController')
const verify = require("../auth/verifyToken");


router.post('/', ItemController.readAvailableItemsOfPage)
router.post('/read', ItemController.readOneItem)
router.post('/create', verify, ItemController.createItem)
router.post('/update', verify, ItemController.updateItem)
router.post('/delete', verify, ItemController.deleteItem)


module.exports = router
