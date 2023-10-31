// Root => /api/users

const express = require("express");
const router = express.Router();
const {
  // signUp,
  emailLogin,
  phoneLogin,
  getUserByEmail,
  getUserByPhoneNumber,
  handleToken,
  getUserById,
  updateUser,
  deleteUser,
  SignUpUser,
  bringUsersData,
  checkPassword,
} = require("../controller/user.Controller");

// Define routes for user operations

router.post("/emailLogin", emailLogin);
router.post("/phoneLogin", phoneLogin);
router.post("/token", handleToken);
router.get("/BringUserData", bringUsersData);
router.post("/SignUpUser", SignUpUser);
router.get("/getOneByEmail/:email", getUserByEmail);
router.get("/getOneByPhone/:phoneNumber", getUserByPhoneNumber);
// router.get("/getAll", getAllUsers);
router.get("/getOne/:id", getUserById);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.post("/passwordCheck/:id", checkPassword);

module.exports = router;
