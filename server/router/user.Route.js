const express = require("express");
const router = express.Router();
const {
  emailLogin,
  phoneLogin,
  getUserInfoByEmail,
  getUserByEmail,
  getUserByPhoneNumber,
  handleToken,
  getUserById,
  updateUser,
  deleteUser,
  SignUpUser,
  bringUsersData,
  checkPassword,
  sendResetPasswordConfirmationCode,
  reniewToken,
} = require("../controller/user.Controller");

router.post("/emailLogin", emailLogin);
router.post("/phoneLogin", phoneLogin);
router.post("/token", handleToken);
router.get("/BringUserData", bringUsersData);
router.get("/getInfoByMail/:email", getUserInfoByEmail);
router.post("/SignUpUser", SignUpUser);
router.get("/getOneByEmail/:email", getUserByEmail);
router.get("/getOneByPhone/:phoneNumber", getUserByPhoneNumber);

router.get("/getOne/:id", getUserById);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.post("/passwordCheck/:id", checkPassword);
router.post(
  "/sendResetPasswordConfirmationCode",
  sendResetPasswordConfirmationCode
);
router.post("/reniewToken", reniewToken);

module.exports = router;
