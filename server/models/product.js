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
    validator: "matches",
    arguments: /^[a-zA-Z0-9\s]+$/,
    message: "Name should contain only letters and numbers"
  })
];
var PriceValidator = [
  validate({
    validator: "isNumeric",
    message: "Price should only be a number"
  })
];
var DescriptionValidator = [
  validate({
    validator: "isLength",
    arguments: [2],
    message: "Description should be at least 2 characters long"
  })
];

var ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "You need to have a first name"],
      validate: NameValidator
    },
    description: {
      type: String,
      required: [true, "You need to have a description"],
      validate: DescriptionValidator
    },
    price: {
      type: String,
      required: [true, "You need to have a password"],
      validate: PriceValidator
    },
    image: {
      type: String,
      required: [true, "You need to have an image"]
    },
    altText: {
      type: String,
      required: [true, "Error retrieving alt-text, please reupload"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
