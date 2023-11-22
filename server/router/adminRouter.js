const {
  emailLogin,
  phoneLogin,
  getUserByEmail,
  getUserByPhoneNumber,
  handleToken,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
  SignUpAdmin,
  updateOneUserblockState,
  bringUsersData,
} = require("../controller/Admin.controller");
const express = require("express");
const router = express.Router();

router.post("/emailLogin", emailLogin);
router.post("/token", handleToken);
router.post("/SignUpAdmin", SignUpAdmin);
router.get("/allUsers", getAllUsers);
router.put("/update/:id", updateOneUserblockState);

module.exports = router;
