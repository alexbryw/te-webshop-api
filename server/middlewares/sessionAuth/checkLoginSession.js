
module.exports = function checkLoginSession(req, res, next) {
    console.log("checking if session is active")

    // the point of this middleware is to return the active session if it has not timed out.
    // the active session has { name: string , admin: boolean }

    // if you dont have a valid session it will renew your userinformation in the session
    // ( ex. you are logged in, but you reload the page. So you want to keep the logged session active )

    let user
    if (req.session.id) {
        user = {
            name: req.session.username,
            admin: req.session.admin
        }
        res.session = user
        next()
    } else {
        res.json({
            err: {
                login: "Please renew your login session!"
            }
        })
    }

    next()
}
