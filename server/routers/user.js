const express = require('express')
const router = express.Router()
const getUsersMW = require('../middleware/getUsers')
const secureRouteMW = require('../middleware/secureRoute')

//Get all user to admin accounts.
router.get('/api/user',secureRouteMW,getUsersMW, async function (req, res) {

    // res.status(404).json({msg: "Last from get user."}) // behövs ej.
})

module.exports = router