const express = require('express')
const router = express.Router()
const {getUsers, getUser} = require('../middleware/user/user-mw')
const secureRoute = require('../middleware/sessionAuth/secure-mw')

//Secure route check before moving on to the next routes below.
router.use(secureRoute)

//Get all user.
router.get('/api/user',getUsers)

//Get one user by id.
router.get('/api/user/:id',getUser)

module.exports = router