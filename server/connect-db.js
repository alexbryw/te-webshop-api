console.log("connect to db from connect-db.js.")
const mongoose = require('mongoose')
require('dotenv').config()
const uri = process.env.ATLAS_URI

mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})

const connection = mongoose.connection

connection.once('open', () => {
    console.log("MongoDB started.")
})