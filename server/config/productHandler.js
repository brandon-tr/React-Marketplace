const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const multer = require("multer");
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 1000 * 1000 }
}).single("image");
const fs = require("fs");
const request = require("request");

module.exports = function(app, path, client, dropbox) {
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
      fs.rename(
        `./uploads/${req.file.filename}`,
        `./uploads/${req.file.filename + req.file.originalname}`,
        function(err) {
          if (err) {
            return res.status(400).json({ error: err });
          }
          fs.readFile(
            path.join(
              __dirname,
              `../uploads/${req.file.filename + req.file.originalname}`
            ),
            function(err, contents) {
              if (err) {
                console.log("Error: ", err);
                return res.status(400).json({ error: "Error uploading image" });
              }
              dropbox
                .filesUpload({
                  path: `/${req.file.filename + req.file.originalname}`,
                  contents: contents
                })
                .then(function(response) {
                  client
                    .labelDetection(
                      `./uploads/${req.file.filename + req.file.originalname}`
                    )
                    .then(results => {
                      const altText =
                        results[0].labelAnnotations[0].description;
                      product = new Product();
                      product.name = req.body.name;
                      product.description = req.body.description;
                      product.price = req.body.price;
                      product.image = req.file.filename + req.file.originalname;
                      product.altText = altText;
                      product.save(function(err) {
                        if (err) {
                          if (err.code === 11000) {
                            return res.status(400).json({
                              error: "Error: Product Name is already used"
                            });
                          }
                          return res
                            .status(400)
                            .json({ error: "Error: Please resubmit the form" });
                        }
                        return res
                          .status(200)
                          .json({ response: "Product Added Successfully" });
                      });
                    })
                    .catch(err => {
                      console.error("ERROR:", err);
                    });
                })
                .catch(function(error) {
                  console.log(error);
                  return res.status(400).json({ error: "Error saving file" });
                });
            }
          );
        }
      );
    });
  });
  app.get("/listProducts", function(req, res, next) {
    Product.find({}, function(err, products) {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({ response: products });
    });
  });
  app.get("/getImage/:imageName", function(req, res, next) {
    dropbox
      .filesDownload({ path: `/${req.params.imageName}` })
      .then(function(data) {
        fs.writeFile(data.name, data.fileBinary, "binary", function(err) {
          if (err) {
            throw err;
          }
          res.sendFile(data.name, {
            root: "./"
          });
        });
      })
      .catch(function(err) {
        throw err;
      });
    // res.sendFile(req.params.imageName, {
    //   root: "../server/uploads"
    // });
  });
  app.get("/getImageText", function(req, res) {});
};
