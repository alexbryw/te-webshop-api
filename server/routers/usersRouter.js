const express = require('express')
const router = express.Router()
const { getUsers, getUser, createUser } = require('../middlewares/user/user-mw')

const checkLoginSession = require('../middlewares/sessionAuth/checkLoginSession')

//Secure route check before moving on to the next routes below.
// router.use(checkLoginSession)

//Get all user.
router.get('/', getUsers)

//Get one user by id.
router.get('/:id', getUser)

// post a new user
router.post('/', createUser)

module.exports = router