const express = require('express')
const router = express.Router()
const { getUsers, getUser, createUser, deleteUser, findUser } = require('../middlewares/user/user.controller')

const { checkLoginSession } = require('../middlewares/session/session.controller')

//Secure route check before moving on to the next routes below.
// router.use(checkLoginSession)

//Get all user.
router.get('/', getUsers)

//Get one user by id.
router.get('/:name', findUser, getUser)

// post a new user
router.post('/', createUser)

// delete a user
router.delete('/:name', findUser, deleteUser)


module.exports = router