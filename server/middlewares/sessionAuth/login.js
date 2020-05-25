function login(req, res, next) {
    console.log("from login")
    // res.json({msg:"from login"})
    if(req.session.userid) {
        res.status(400).json({msg: "you are already logged in."})
    } else {
        req.session.userid = "1234"
        req.session.admin = true
        res.json({msg: "username: Hej, user id 1234, admin: true"})
    }
}

//get user info from db.
function checkLogin(req, res, next){
    if(req.session.userid) {
        console.log(req.session.userid)
        res.json({msg: "You are logged in."})
    } else {
        res.status(401).json({msg: 'You are not logged in'})
    }
}

function logout(req,res,next) {
    if(req.session.userid) {
        req.session = null
        res.json({msg: 'You have logged out ✅'})
    } else {
        res.status(401).json({msg: 'You have to login to logout'})
    }
}

module.exports = {login , checkLogin, logout}