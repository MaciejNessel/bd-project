const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const ItemRoute = require('./src/routes/item')
const OrderRoute = require('./src/routes/order')
const UserRoute = require('./src/routes/user')
const app = express();
const cors = require('cors')

require('dotenv').config()
const PORT = process.env.PORT || 2222

// Database connection
require('./config/database')


app.use(morgan(`dev`));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Fix cors
app.use(cors())

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})


app.listen(PORT, () => {
    console.log(`✔ Server is running on PORT ${PORT}`)
})


app.use(`/item`, ItemRoute)
app.use('/order', OrderRoute)
app.use('/user', UserRoute)