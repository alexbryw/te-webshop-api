const express = require('express')
const router = express.Router()
const { login, logout, checkLoginSession, checkAuthorization } = require('../middlewares/session/session.controller')
const { findUser } = require("../middlewares/user/user.controller")

//checks if user is loggedIn
router.get('/login', checkLoginSession)

//logIn.
router.post('/login', findUser, login)

//Logout.
router.delete('/logout', checkLoginSession, logout)

module.exports = router