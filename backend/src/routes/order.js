const express = require('express')
const router = express.Router()

const OrderController = require('../controllers/OrderController')
const verify = require("../auth/verifyToken");


router.post('/create', verify, OrderController.createOrder)
router.post('/', verify, OrderController.readAllOrdersByUser)


module.exports = router
