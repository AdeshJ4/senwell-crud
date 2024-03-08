const _ = require("lodash");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const {
  User,
  validateUserRegister,
  validateUserLogin,
  validateUserUpdate,
  validateUser,
} = require("../models/userModel");
const emailService = require("../utils/emailService");

const pageSize = 10;

const registerUser = async (req, res) => {
  try {
    console.log("I am Here1");
    const {
      firstName,
      lastName,
      mobileNo,
      email,
      country,
      password,
      dateOfBirth,
      gender,
    } = req.body;
    console.log(req.body);
    const { error } = validateUserRegister(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    console.log("I am Here2");
    let userAvailable = await User.findOne({ email });
    if (userAvailable) return res.status(400).send("User Already registered");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log("I am Here 3");
    const user = await User.create({
      firstName,
      lastName,
      country,
      mobileNo,
      email,
      dateOfBirth,
      gender,
      password: hashedPassword,
    });
    console.log("I am Here 4");

    let subject = `Welcome to ${firstName} - Registration Successful.`;
    let text = `Dear ${firstName},

    Thank you for registering with Senwell! We are excited to welcome you to our community.
    Your account has been successfully created, and you can now enjoy the benefits of being a member. If you have any questions 
    or need assistance, feel free to reach out to our support team.
    
    Best regards,
    Senwell Team
    `;
    emailService.sendEmail(email, subject, text);

    // exclude password
    return res
      .status(201)
      .send({ firstName: user.firstName, email: user.email });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = validateUserLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const userAvailable = await User.findOne({ email });

    if (
      userAvailable &&
      (await bcrypt.compare(password, userAvailable.password))
    ) {
      const token = userAvailable.generateToken();
      return res.status(200).send(token);
    } else {
      return res.status(400).send("Invalid email or password");
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getUser = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send("Invalid Employee Id");

    const user = await User.findById(req.params.id).select("-password");

    if (!user) return res.status(404).send("User Not Found");

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getUserByName = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 1;

    const userName = req.params.userName;
    const regex = new RegExp(userName, "i"); // Case-insensitive regex for partial match

    // Search for movies with similar names
    const count = await User.countDocuments({ name: regex });
    const users = await User.find({ name: regex })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .select("-password");
    return res.status(200).json({ count, users });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const updateUser = async (req, res) => {
  console.log("file:", req.file);

  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send("Invalid UserId");
    }
    console.log("req.body: ", req.body);

    const { file, userData } = req.body;
    console.log("file: ", file);
    console.log("userData: ", userData);

    const { _id, email, __v, ...newUserData } = JSON.parse(userData);
    console.log("newUserData: ", newUserData);
    const { error } = validateUser(newUserData);
    if (error) {
      console.log(error.details[0].message);
      return res.status(400).send(error.details[0].message);
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/Images/${
      req.file.filename
    }`;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        firstName: newUserData.firstName,
        lastName: newUserData.lastName,
        mobileNo: newUserData.mobileNo,
        country: newUserData.country,
        gender: newUserData.gender,
        dateOfBirth: newUserData.dateOfBirth,
        profilePicture: imageUrl, // Store relative path instead of absolute path
      },
      {
        new: true,
      }
    );
    if (!user)
      return res
        .status(404)
        .send(`The User with given id ${req.params.id} not found`);

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send("Invalid UserId");
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res
        .status(404)
        .send(`The User with given id ${req.params.id} not found`);
    }

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  getUsers,
  getUserByName,
  updateUser,
  deleteUser,
};
