function secureRoute(req, res, next) {
    //check if correct user or admin can go to next.
    // req.session.admin ? res.status(401).json({msg:"Login with admin."})
    console.log("from secure route")
    next()
}

module.exports = secureRoute