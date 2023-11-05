const { CreateBooking } = require("../controller/booking.controller");
const express = require("express");
const bookingRouter = express.Router();

bookingRouter.post("/addBooking", CreateBooking);

module.exports = bookingRouter;
