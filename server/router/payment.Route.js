const express = require("express");
const router = express.Router();
const { create } = require("../controller/payment.Controller");

router.post("/intents", create);
module.exports = router;
