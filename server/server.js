const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("./config/mongoose");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;
const userHandler = require("./config/userHandler");
const productHandler = require("./config/productHandler");

userHandler(app, path);
productHandler(app, path);

const server = app.listen(port, console.log(`listening on ${port}`));
