const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("./config/mongoose");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;
const routes = require("./config/routes");

routes(app, path);

const server = app.listen(port, console.log(`listening on ${port}`));
