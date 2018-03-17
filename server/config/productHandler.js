var multer = require("multer");
var upload = multer({
  dest: "uploads/",
  limits: { fileSize: 1000 * 1000 }
}).single("image");

module.exports = function(app, path) {
  app.post("/addProduct", function(req, res, next) {
    upload(req, res, function(err) {
      if (err && err.code === "LIMIT_FILE_SIZE") {
        res.status(400).json({ error: "File size is too large" });
        return;
      }
      switch (req.file.mimetype) {
        case "image/jpeg":
          break;
        case "image/jpg":
          break;
        case "image/png":
          break;
        default:
          err = "Invalid file type";
      }
      if (err) {
        res.status(400).json({ error: err });
        return;
      }
      res.status(200).json({ response: "good" });
    });
  });
};
