const express = require('express')
const router = express.Router()
const { login, logout, checkLoginSession, checkAuthorization, setSession } = require('../middlewares/session/session.controller')
const { findUser } = require("../middlewares/user/user.controller")

//checks if user is loggedIn
router.get('/', checkLoginSession, setSession)

//logIn.
router.post('/login', login)

//Logout.
router.delete('/logout', logout)

module.exports = router