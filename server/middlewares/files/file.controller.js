const File = require("../../models/file.model");

function addFile(req, res, next) {
  const file = new File({
    name: req.files.image.name,
    data: req.files.image.data,
    contentType: req.files.image.mimetype,
  });
  file.save((err, doc) => {
    if (err) {
      next(err);
      return;
    }
    doc.data = undefined;
    res.send(doc);
  });
}

function getFile(req, res, next) {
  const file = File.findById({ _id: req.params.id }, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.set("Content-Type", result.contentType);
      res.send(result.data);
    }
  });
}

module.exports = {
  addFile,
  getFile,
};
