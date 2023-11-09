const { CreateAgency, UpdateAgency, fetchAll } = require("../controller/Agency.controller")
const express = require("express")
const router = express.Router()

router.post("/addAgency", CreateAgency)
router.get("/findAll",fetchAll)
router.put("/UpdateAgencyData", UpdateAgency)
module.exports = router