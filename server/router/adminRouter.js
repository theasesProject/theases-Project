const express = require("express");
const router = express.Router();
const {
  emailLogin,
  phoneLogin,
  getUserByEmail,
  getUserByPhoneNumber,
  handleToken,
  getUserById,
  updateUser,
  deleteUser,
  SignUpAdmin,
  bringUsersData,
} = require("../controller/Admin.controller");

router.post("/emailLogin", emailLogin);
router.post("/phoneLogin", phoneLogin);
router.post("/token", handleToken);
router.post("/SignUpAdmin", SignUpAdmin);
router.get("/allUsers", getAllUsers);
router.put("/update/:id", updateOneUserblockState);

module.exports = router;
