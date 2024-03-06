const express = require("express");
const router = express();
const {
  registerUser,
  loginUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");
const multer = require("multer");
const path = require("path");

// register
router.post("/register", registerUser);

// login - authentication
router.post("/login", loginUser);

// get user by id
router.get("/:id", getUser);

// get all users/employees
router.get("/", getUsers);

// Update User
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    console.log("storage:rs", file);
    callback(null, "./public/Images");
  },
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.put("/:id", upload.single("file"), updateUser);

// delete user
router.delete("/:id", deleteUser);

module.exports = router;
