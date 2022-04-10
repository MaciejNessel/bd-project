const mongoose = require('mongoose')
require('dotenv').config()

// This class is responsible for connecting to the database
class Connection {
    constructor() {
        const url = process.env.DB_URL

        this.connect(url).then(() => {
            console.log(`✔ Database Connected -> url: ${url}`)
        }).catch( (err) => {
            console.error( '✘ Not connected: ', err.message )
        });
    }

    async connect(url) {
        try {
            await mongoose.connect(url)
        } catch (err) {
            throw err
        }
    }
}

module.exports = new Connection()