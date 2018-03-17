var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
const secret = "SuperSecret";
var User = mongoose.model("User");
var bcrypt = require("bcrypt");

module.exports = function(app, path) {
  app.get("/testApi", function(req, res) {
    res.json("Heloo");
  });
  app.post("/register", function(req, res) {
    let user = new User(req.body);
    user.save(function(err) {
      if (err) {
        let errorList = [];
        if (err.errors) {
          if (err.errors.firstName) {
            errorList.push(err.errors.firstName.message);
          }
          if (err.errors.lastName) {
            errorList.push(err.errors.lastName.message);
          }
          if (err.errors.email) {
            errorList.push(err.errors.email.message);
          }
          if (err.errors.password) {
            errorList.push(err.errors.password.message);
          }
        }
        if (err.errmsg) {
          errorList.push("User with that email already exist");
        }
        return res.status(400).json({ response: errorList });
      }
      const token = jwt.sign(req.body, secret);
      return res
        .status(200)
        .json({ token: token, response: "Successfully Registered User" });
    });
  });
  app.post("/login", function(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
      if (user) {
        bcrypt.compare(req.body.password, user.password, function(
          err,
          response
        ) {
          if (err) {
            res.status(401).json({ response: "Please try again" });
          } else {
            if (response) {
              const token = jwt.sign(req.body, secret);
              return res
                .status(200)
                .json({ token: token, success: "Successfully logged in" });
            } else {
              res.status(401).json({ response: "Please try again" });
            }
          }
        });
      } else {
        res.status(401).json({ response: "Please try again" });
      }
    });
  });
};
