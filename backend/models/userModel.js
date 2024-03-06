const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
    minlength: 5,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    trim: true,
    minlength: 5,
    maxlength: 50,
  },
  dateOfBirth: {
    type: Date,
    required: [true, "dateOfBirth is required"],
  },
  gender: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    enum: ['male', 'female', 'other'] // Assuming these are the options for gender
  },
  mobileNo: {
    type: Number,
    required: [true, "Mobile No is required"],
  },
  country: {
    type: String,
    required: [true, "Country is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email address already taken"],
    minlength: 11,
    maxlength: 100,
  },
  password: {
    type: String,
    required: [true, "Password required"],
    minlength: 5,
    maxlength: 1024, // in encoded format
  },
  profilePicture: {
    type: String, // Store the file name of the image
    default: "profile_pic.jpg" // Provide a default image file name if no profile picture is provided
  }
});

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { _id: this._id, userName: this.name },
    config.get("jwtPrivateKey"),
    { expiresIn: "2 days" }
  );

  return token;
};

function validateUserRegister(user) {
  const joiSchema = Joi.object({
    firstName: Joi.string().required().min(5).max(50).trim(),
    lastName: Joi.string().required().min(5).max(50).trim(),
    mobileNo: Joi.number().required(),
    dateOfBirth: Joi.date().required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    email: Joi.string().min(11).max(50).required().email(),
    country: Joi.string().required(),
    password: passwordComplexity().required(),
  });

  return joiSchema.validate(user);
}

function validateUser(user) {
  const joiSchema = Joi.object({
    firstName: Joi.string().required().min(5).max(50).trim(),
    lastName: Joi.string().required().min(5).max(50).trim(),
    mobileNo: Joi.number().required(),
    country: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
  });

  return joiSchema.validate(user);
}

function validateUserLogin(user) {
  const joiSchema = Joi.object({
    email: Joi.string().min(11).max(255).required().email(),
    password: passwordComplexity().required(),
  });

  return joiSchema.validate(user);
}

const User = mongoose.model("User", userSchema);

module.exports = { User, validateUserRegister, validateUserLogin, validateUser };
