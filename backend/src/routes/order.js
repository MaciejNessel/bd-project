const express = require('express')
const router = express.Router()

const OrderController = require('../controllers/OrderController')

router.post('/create', OrderController.createOrder)
router.get('/', OrderController.readAllOrders)

module.exports = router
