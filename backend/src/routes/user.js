const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')

const verify = require("../auth/verifyToken")

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/test', verify, UserController.test)

module.exports = router
