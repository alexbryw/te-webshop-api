const express = require('express')
const router = express.Router()
//const {getUsers, getUser} = require('../middleware/user/user-mw')
const secureRoute = require('../middleware/sessionAuth/secure-mw')
const {login, checkLogin, logout} = require('../middleware/sessionAuth/login')

//checks if user is loggedIn
router.get('/api/login', secureRoute,checkLogin)

//logIn.
router.post('/api/login', login)

//Logout.
router.delete('/api/logout',logout)

module.exports = router