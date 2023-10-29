// Root => /api/users

const express = require("express");
const router = express.Router();
const {
  signUp,
  emailLogin,
  phoneLogin,
  getUserByEmail,
  getUserByPhoneNumber,
  handleToken,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controller/user.Controller");

// Define routes for user operations
router.post("/signup", signUp);
router.post("/emailLogin", emailLogin);
router.post("/phoneLogin", phoneLogin);
router.post("/token", handleToken);
router.get("/getOneByEmail/:email", getUserByEmail);
router.get("/getOneByPhone/:phoneNumber", getUserByPhoneNumber);
router.get("/getAll", getAllUsers);
router.get("/getOne/:id", getUserById);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
