const express = require('express')
const router = express.Router()
const { login, logout, checkLoginSession, checkAuthorization, setSession } = require('../middlewares/session/session.controller')


//checks if user is loggedIn
router.get('/',
    checkLoginSession,
    setSession)

//logIn.
router.post('/login',
    login)

//Logout.
router.delete('/logout',
    checkLoginSession,
    checkAuthorization,
    logout)

module.exports = router