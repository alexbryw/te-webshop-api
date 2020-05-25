function checkLoginSession(req, res, next) {
    // the point of this middleware is to return the active session if it has not timed out.
    // the active session has { name: string , admin: boolean }

    // if you dont have a valid session it does not return anything but still does the "next()"
    // ( ex. you are logged in, but you reload the page. So you want to keep the logged session active )

    console.log("checking if session is valid")
    next()
}

module.exports = checkLoginSession