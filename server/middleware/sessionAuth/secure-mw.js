function secureRoute(req, res, next) {
    console.log("from secure route")
    next()
    // if(req.session.admin) {
    //     next()
    // } else {
    //     res.status(401).json('Pleace login with admin account')
    // }
}

module.exports = secureRoute