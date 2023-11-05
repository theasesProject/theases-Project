const express = require("express");
const router = express.Router();
const {
  createRequest,
  getAll,
  getAllUnverifiedRequests,
} = require("../controller/Request.Controller");

router.get("/getAll", getAll);
router.get("/getAllUnverified", getAllUnverifiedRequests);
router.post("/create/:id", createRequest);
module.exports = router;
