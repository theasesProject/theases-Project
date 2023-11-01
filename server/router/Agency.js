const { CreateAgency, UpdateAgency } = require("../controller/Agency.controller")
const express = require("express")
const router = express.Router()

router.post("/addAgency", CreateAgency)
router.put("/UpdateAgencyData", UpdateAgency)
module.exports = router