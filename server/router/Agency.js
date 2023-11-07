const {
  CreateAgency,
  UpdateAgency,
} = require("../controller/Agency.controller");
const express = require("express");
const router = express.Router();

router.post("/addAgency/:reqId", CreateAgency);
router.put("/UpdateAgencyData", UpdateAgency);
module.exports = router;
