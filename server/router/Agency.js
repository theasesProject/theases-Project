const { CreateAgency, UpdateAgency, fetchAll ,getOneId } = require("../controller/Agency.controller")
const express = require("express")
const router = express.Router()

router.post("/addAgency", CreateAgency)
router.get("/findAll",fetchAll)
router.get("/getOne/:id",getOneId)
router.put("/UpdateAgencyData", UpdateAgency)
router.post("/addAgency/:reqId", CreateAgency);
router.put("/UpdateAgencyData", UpdateAgency);
module.exports = router
