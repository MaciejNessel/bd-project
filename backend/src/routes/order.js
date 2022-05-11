const express = require('express')
const router = express.Router()

const OrderController = require('../controllers/OrderController')

router.get('/', OrderController.readAllOrders)
router.post('/create', OrderController.createOrder)


module.exports = router
