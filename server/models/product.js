var mongoose = require("mongoose");
var validate = require("mongoose-validator");
var bcrypt = require("bcrypt");

var NameValidator = [
  validate({
    validator: "isLength",
    arguments: [3],
    message: "Name should be more than 2 characters"
  }),
  validate({
    validator: "isAlpha",
    message: "Name should contain only letters"
  })
];
var PriceValidator = [
  validate({
    validator: "isNumeric",
    message: "Price should only be a number"
  })
];

var ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "You need to have a first name"],
      validate: NameValidator
    },
    price: {
      type: Number,
      required: [true, "You need to have a password"],
      validate: PriceValidator
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
