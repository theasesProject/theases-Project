const express = require("express");
const router = express.Router();
const { createRequest, getAll } = require("../controller/Request.Controller");

router.get("/getAll", getAll);
router.post("/create/:id", createRequest);
module.exports = router;
