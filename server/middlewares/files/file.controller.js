const File = require("../../models/file.model");

function addFile(req, res, next) {
    // console.log(req.files)
    const file = new File({
        data: req.files.image.data,
        contentType: req.files.image.mimetype,
        name:  req.files.image.name
    })
    console.log(file)
    file.save((err, doc) => {
        if (err) {
            next(err)
            console.log(err)
            return
        }
        doc.data = undefined
        console.log(doc)
        res.send(doc)
    }) 
}

function getFile(req, res, next) {
    console.log(req.file)
    res.send("added")
}

module.exports = {
    addFile,
    getFile
  };