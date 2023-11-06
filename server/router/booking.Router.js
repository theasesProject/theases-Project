const {
  CreateBooking,
  GetUnavailableDatesForCar,
  GetAvailableDatesForCar,
} = require("../controller/booking.controller");
const express = require("express");
const bookingRouter = express.Router();

// Route to create a booking
bookingRouter.post("/createbooking", CreateBooking);

// Route to get all unavailable dates for a specific car
bookingRouter.get("/unavailabledates/:oneCar", GetUnavailableDatesForCar);

// Route to get all available dates for a specific car
bookingRouter.get("/availabledates/:oneCar", GetAvailableDatesForCar);

module.exports = bookingRouter;
