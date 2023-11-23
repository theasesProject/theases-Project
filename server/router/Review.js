const {
  BringAllReview,
  MakeReview,
  getAllByAgencyId,
} = require("../controller/Review.controller");
const express = require("express");
const router = express.Router();

router.get("/BringData", BringAllReview);
router.get("/getAllByAgencyId/:AgencyId", getAllByAgencyId);
router.post("/MakeReview/:receiverId", MakeReview);
module.exports = router;
