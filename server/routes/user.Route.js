// Root => /api/users

const express = require("express");
const router = express.Router();
const {
  signUp,
  emailLogin,
  phoneLogin,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user.Controller");

// Define routes for user operations
router.post("/signup", signUp);
router.post("/emailLogin", emailLogin);
router.post("/phoneLogin", phoneLogin);
router.get("/getAll", getAllUsers);
router.get("/getOne/:id", getUserById);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
