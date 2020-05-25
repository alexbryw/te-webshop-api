
module.exports = function checkAdminRights(req, res, next) {
    console.log("checking if session is active")

    if (res.session.admin) {
        console.log('you have admin rights');
        next()

    } else {
        res.json({
            err: {
                msg: "you don't have access"
            }
        })
    }

    next()
}
