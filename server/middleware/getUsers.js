function getUsers(req, res, next) {
    //get att users from database.
    console.log("from get users")
    res.json({msg: "here are all users."})
    next()
}

module.exports = getUsers