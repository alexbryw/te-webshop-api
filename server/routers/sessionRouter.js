const express = require('express')
const router = express.Router()
//const {getUsers, getUser} = require('../middleware/user/user-mw')
const checkLoginSession = require('../middlewares/sessionAuth/checkLoginSession')
const {login, checkLogin, logout} = require('../middlewares/sessionAuth/login')

//checks if user is loggedIn
router.get('/api/login', checkLoginSession,checkLogin)

//logIn.
router.post('/api/login', login)

//Logout.
router.delete('/api/logout',logout)

module.exports = router