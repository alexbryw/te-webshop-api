const express = require('express')
const router = express.Router()
const { getUsers, getUser, createUser, deleteUser, findUser, updateUser } = require('../middlewares/user/user.controller')

const {
    checkLoginSession,
    checkAuthorization
} = require('../middlewares/session/session.controller')

//Get all users.
router.get('/',
    checkLoginSession,
    checkAuthorization,
    getUsers)

//Get one user by id.
router.get('/:name',
    findUser,
    getUser)

// post a new user
router.post('/',
    createUser)

// used only when an admin confirms a new admin
router.put("/:userID",
    checkLoginSession,
    checkAuthorization,
    updateUser)

// delete a user
router.delete('/:name',
    checkLoginSession,
    checkAuthorization,
    findUser,
    deleteUser)

module.exports = router