
const User = require("../../models/userModel");


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

//Get one user by id from db.
function getUser(req, res, next) {
    console.log("from one users")
    res.json({ msg: "Here is one(1) user." })
    next()
}

async function createUser(req, res, next) {
    const user = new User({
        name: req.body.name,
        password: req.body.password,
        admin: req.body.admin,
    });
    try {
        const newUser = await user.save();
        res.status(201).json({ name: newUser.name, admin: newUser.admin });
        next()
    } catch (err) {
        // res.status.apply(400).json({ message: err.message })
        res.status(400).json({ message: err.message });
    }
}

module.exports = { getUsers, getUser, createUser }