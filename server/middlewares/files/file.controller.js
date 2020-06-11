const File = require("../../models/file.model");

function addFile(req, res, next) {
  // console.log('******file.conttroller.js***** 1 req.file*****',req.files)
  const file = new File({
    name: req.files.image.name,
    data: req.files.image.data,
    contentType: req.files.image.mimetype,
  });
  // console.log('******file.conttroller.js***** 2 ***** file ******',file);
  file.save((err, doc) => {
    if (err) {
      next(err);
      console.log(err);
      return;
    }
    doc.data = undefined;
    // console.log(doc);
    res.send(doc);
  });
}

function getFile(req, res, next) {
  const file = File.findById({ _id: req.params.id }, (err, result) => {
    if (err) {
      next(err);
    } else {
      // console.log(result);

      res.set("Content-Type", result.contentType);
      res.send(result.data);
      // res.json(result);
    }
  });
}

module.exports = {
  addFile,
  getFile,
};
