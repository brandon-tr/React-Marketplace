const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("./config/mongoose");
require("isomorphic-fetch");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;
const userHandler = require("./config/userHandler");
const productHandler = require("./config/productHandler");
// Change this to your google service account json file
const filePath = path.join(__dirname, "./../../test123-0b3e3b32b9da.json");
process.env.GOOGLE_APPLICATION_CREDENTIALS = filePath;
const vision = require("@google-cloud/vision").v1p1beta1;
const client = new vision.ImageAnnotatorClient();
var Dropbox = require("dropbox").Dropbox;
var dbx = new Dropbox({
  accessToken: ""
});
userHandler(app, path);
productHandler(app, path, client, dbx);

const server = app.listen(port, console.log(`listening on ${port}`));
// app.get("*", function(request, response) {
//   response.sendFile(path.resolve(__dirname, "./build/index.html"));
// });
