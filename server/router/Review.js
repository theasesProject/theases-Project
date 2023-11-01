const  { BringAllReview, MakeReview } = require("../controller/Review.controller")
const express = require("express")
 const router = express.Router()

 router.get("/BringData", BringAllReview)
router.post("/MakeReview", MakeReview)
module.exports=router