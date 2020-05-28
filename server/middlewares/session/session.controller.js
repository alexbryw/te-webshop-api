

async function login(req, res, next) {

    if (!res.user) return res.status(401).json({ err: 'Wrong username or password' })

    // compare the input password with the password tha tis saved and encrypted in the DB
    res.user.comparePassword(req.body.password, async (error, isMatch) => {
        if (error) throw error
        if (!isMatch) return res.status(401).json({ err: 'Wrong password' })
        console.log("its a match");


        // create a session with the valid user input
        req.session.id = res.user._id
        req.session.username = res.user.name
        req.session.admin = res.user.admin

        console.log("created client session");

        // return successful login
        res.json({ name: res.user.name, admin: res.user.admin })
        // next()
    })
}

// -- -- -- -- --

function logout(req, res, next) {
    if (req.session.userid) {
        req.session = null
        res.json({ msg: 'You have logged out ✅' })
    } else {
        res.status(401).json({ msg: 'You have to login to logout' })
    }
}


// -- -- -- -- --

function checkLoginSession(req, res, next) {
    console.log("checking if session is active")

    // the point of this middleware is to return the active session if it has not timed out.
    // the active session has { name: string , admin: boolean }

    // if you dont have a valid session it will renew your userinformation in the session
    // ( ex. you are logged in, but you reload the page. So you want to keep the logged session active )

    let user
    if (req.session.id) {
        console.log("session active");

        user = {
            name: req.session.username,
            admin: req.session.admin
        }
        res.session = user
        next()
    } else {
        console.log("no session");
        res.json({
            err: {
                login: "Please renew your login session!"
            }
        })
    }

    next()
}


// -- -- -- -- --


function checkAuthorization(req, res, next) {

    // blocks any non administrator

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




module.exports = { login, logout, checkLoginSession, checkAuthorization }