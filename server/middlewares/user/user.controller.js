
const User = require("../../models/user.model");


//Get all users from database..
async function getUsers(req, res, next) {
    try {
        const users = await User.find();
        res.json(users);
        next()
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


// get one user
async function getUser(req, res, next) {
    res.json(res.user)
}
//Get one user by id from db.
async function findUser(req, res, next) {
    console.log("get one user")

    let user
    let condition;

    if (req.body.name) condition = req.body.name
    if (req.params.name) condition = req.params.name

    try {
        user = await User.findOne({ name: condition })
        if (user == null) {
            return res.status(404).json({ err: 'Can not find user' })
        }
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
    res.user = user
    next()


}

async function createUser(req, res, next) {
    const user = new User({
        name: req.body.name,
        password: req.body.password,
        admin: req.body.admin,
        requestsAdmin: req.body.requestsAdmin,
    });
    try {
        const newUser = await user.save();
        res.status(201).json({ name: newUser.name, admin: newUser.admin });
        next()
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function deleteUser(req, res, next) {
    console.log("delete :", res.user);
    try {
        await res.user.remove()
        res.json({ msg: "deleted user: " + res.user.name })
    } catch (err) {
        res.status(500).json({ message: err.mesage })
    }
}

module.exports = { getUsers, getUser, createUser, deleteUser, findUser }