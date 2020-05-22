//Get all users from database..
function getUsers(req, res, next) {
    console.log("from get users")
    res.json({msg: "Here are all users."})
    // new Error(message)
    // next(Error)
    next()
}

//Get one user by id from db.
function getUser(req, res, next) {
    //get att users from database.
    console.log("from one users")
    res.json({msg: "Here is one(1) user."})
    next()
}

module.exports = {getUsers, getUser}