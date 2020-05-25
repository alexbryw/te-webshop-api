function errorAll(err,req, res, next) {
    //TODO kolla error.
    console.log("from error")
    res.status(500).json( {msg: err.message} )
    // next()
}

module.exports = secureRoute