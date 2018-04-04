const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const secret = "SuperSecret";
const User = mongoose.model("User");
const bcrypt = require("bcrypt");

module.exports = function(app, path) {
  app.get("/testApi", function(req, res) {
    res.json("Heloo");
  });
  // app.get("*", function(req, res) {
  //   console.log(req.ip);
  // });
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
      const token = jwt.sign({ name: user.firstName, id: user._id }, secret);
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
              const token = jwt.sign(
                { name: user.firstName, id: user._id },
                secret
              );
              return res
                .status(200)
                .json({ token: token, success: "Successfully logged in" });
            } else {
              return res.status(401).json({ response: "Please try again" });
            }
          }
        });
      } else {
        return res.status(401).json({ response: "Please try again" });
      }
    });
  });
  app.get("/getUser/:id", function(req, res) {
    User.findOne({ _id: req.params.id }, function(err, user) {
      if (err) {
        res.status("400").json({ error: "User Not Found" });
        return "error";
      }
      let name = user.firstName + " " + user.lastName;
      return res.status(200).json({
        name: name,
        email: user.email,
        money: user.money,
        cart: user.cart
      });
    });
  });
  app.post("/addCart/:id", function(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          cart: {
            id: req.body._id,
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            altText: req.body.altText
          }
        }
      },
      function(err, user) {
        if (err) {
          return res.status(400).json({ error: "Error adding to cart" });
        }
        user.save(function(err) {
          return res.status(200).json({ response: "Good" });
        });
      }
    );
  });
  app.post("/checkOut/:id", function(req, res) {
    User.findOne({ _id: req.params.id }, function(err, user) {
      if (err) {
        return res.status(401).json({ error: "User not Found" });
      }
      if (user.money < req.body.price) {
        return res.status(401).json({ error: "You have too little money" });
      }
      let price = req.body.price;
      price = price * -1;
      User.update(
        { _id: req.params.id },
        { $inc: { money: price }, $set: { cart: [] } },
        function(err, affected) {
          if (err) {
            return res.status(400).json({ error: "Error adding to cart" });
          }
          return res
            .status(200)
            .json({ response: "Successfully bought product" });
        }
      );
    });
  });
};
